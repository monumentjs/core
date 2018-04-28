import {Type} from '@monument/core/main/Type';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {ListMap} from '@monument/collections/main/ListMap';
import {Parameter} from '@monument/reflection/main/Parameter';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {DefaultType} from '@monument/stereotype/main/DefaultType';
import {DefaultTypeConfiguration} from '@monument/stereotype/main/DefaultTypeConfiguration';
import {UnitDefinition} from '../../definition/UnitDefinition';
import {UnitDefinitionRegistry} from '../../definition/registry/UnitDefinitionRegistry';
import {NoSuchUnitDefinitionException} from '../../NoSuchUnitDefinitionException';
import {UnitPostProcessor} from '../configuration/UnitPostProcessor';
import {UnitFactory} from '../UnitFactory';
import {ConfigurableUnitFactory} from '../ConfigurableUnitFactory';


export class DefaultUnitFactory implements ConfigurableUnitFactory {
    private _parent: UnitFactory | undefined;
    private readonly _registry: UnitDefinitionRegistry;
    private readonly _unitPostProcessors: ArrayList<UnitPostProcessor> = new ArrayList();
    private readonly _singletons: ListMap<Type<object>, Promise<object>> = new ListMap();


    public get unitTypes(): ReadOnlySet<Type<object>> {
        return this._registry.unitTypes;
    }


    public get unitPostProcessorCount(): number {
        return this._unitPostProcessors.length;
    }


    public get parent(): UnitFactory | undefined {
        return this._parent;
    }


    public set parent(value: UnitFactory | undefined) {
        this._parent = value;
    }


    public constructor(definitions: UnitDefinitionRegistry) {
        this._registry = definitions;
    }


    public addUnitPostProcessor(postProcessor: UnitPostProcessor): void {
        this._unitPostProcessors.add(postProcessor);
    }


    public containsUnit<T extends object>(type: Type<T>): boolean {
        return this._registry.containsUnitDefinition(type);
    }


    public destroyUnit<T extends object>(type: Type<T>, instance: T): void {
        let definition = this.getUnitDefinition(type);

        if (definition.destroyMethodName != null) {
            (instance as any)[definition.destroyMethodName]();
        }
    }


    public getUnit<T extends object>(type: Type<T>): Promise<T> {
        if (this.containsUnitDefinition(type)) {
            let definition = this.getUnitDefinition(type);

            if (definition.isSingleton) {
                if (!this._singletons.containsKey(type)) {
                    this._singletons.put(type, this.createUnit(type));
                }

                return this._singletons.get(type) as Promise<T>;
            } else {
                return this.createUnit(type);
            }
        }

        if (this.parent != null) {
            return this.parent.getUnit(type);
        }

        throw new NoSuchUnitDefinitionException(`Unit definition for type ${type.name} not found in ${this.constructor.name}.`);
    }


    public registerUnitDefinition<T extends object>(type: Type<T>, definition: UnitDefinition): void {
        this._registry.registerUnitDefinition(type, definition);
    }


    public containsUnitDefinition<T extends object>(type: Type<T>): boolean {
        return this._registry.containsUnitDefinition(type);
    }


    public getUnitDefinition<T extends object>(type: Type<T>): UnitDefinition {
        return this._registry.getUnitDefinition(type);
    }


    protected async createUnit<T extends object>(type: Type<T>): Promise<T> {
        const klass: Class<T> = Class.of(type);
        const definition: UnitDefinition = this.getUnitDefinition(type);
        let instance: T;

        if (definition.factoryMethodName != null && definition.factoryUnitType != null) {
            instance = await this.createUnitWithFactory(
                definition.factoryUnitType,
                definition.factoryMethodName
            ) as T;
        } else {
            let args: any[] = await this.getParameterValues(klass.constructorParameters);

            instance = klass.instantiate(...args);
        }

        // TODO: set property values
        // TODO: After Properties Set phase

        for (let methodName of definition.postConstructMethodNames) {
            await (instance as any)[methodName]();
        }

        for (let processor of this._unitPostProcessors) {
            instance = await processor.postProcessBeforeInitialization(instance, type);
        }

        if (definition.initMethodName != null) {
            await (instance as any)[definition.initMethodName]();
        }

        for (let processor of this._unitPostProcessors) {
            instance = await processor.postProcessAfterInitialization(instance, type);
        }

        return instance;
    }


    private async createUnitWithFactory(
        factoryUnitType: Type<object>,
        factoryMethodName: string | symbol
    ): Promise<object> {
        const factoryClass: Class<object> = Class.of(factoryUnitType);
        const factoryMethod: Method = factoryClass.getMethod(factoryMethodName);
        const factoryInstance: object = await this.getUnit(factoryUnitType);

        const args: any[] = await this.getParameterValues(factoryMethod.parameters);

        return (factoryInstance as any)[factoryMethodName](...args);
    }


    private async getParameterValues(parameters: ReadOnlyMap<number, Parameter>): Promise<any[]> {
        const args: any[] = [];

        for (let {key, value: parameter} of parameters) {
            let parameterType: Type<any> | undefined = parameter.type;

            if (parameter.isDecoratedWith(DefaultType)) {
                let configuration = parameter.getAttribute(DefaultTypeConfiguration.ATTRIBUTE_KEY);

                if (configuration != null) {
                    parameterType = configuration.defaultType;
                }
            }

            if (parameterType != null) {
                args[key] = await this.getUnit(parameterType);
            }
        }

        return args;
    }
}
