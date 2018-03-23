import {Type} from '@monument/core/main/Type';
import {Collection} from '@monument/collections-core/main/Collection';
import {ReadOnlySet} from '@monument/collections-core/main/ReadOnlySet';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {UnitDefinition} from '../../definition/UnitDefinition';
import {UnitDefinitionRegistry} from '../../definition/registry/UnitDefinitionRegistry';
import {DefaultType} from '../../configuration/decorators/DefaultType';
import {DefaultTypeConfiguration} from '../../configuration/decorators/DefaultTypeConfiguration';
import {UnitPostProcessor} from '../configuration/UnitPostProcessor';
import {UnitFactory} from '../UnitFactory';
import {ConfigurableUnitFactory} from '../ConfigurableUnitFactory';
import {NoSuchUnitDefinitionException} from '../../NoSuchUnitDefinitionException';
import {ReadOnlyMap} from '@monument/collections-core/main/ReadOnlyMap';
import {Parameter} from '@monument/reflection/main/Parameter';


export class DefaultUnitFactory implements ConfigurableUnitFactory {
    private _parent: UnitFactory | undefined;
    private readonly _registry: UnitDefinitionRegistry;
    private readonly _unitPostProcessors: Collection<UnitPostProcessor> = new ArrayList();


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


    public async getUnit<T extends object>(type: Type<T>): Promise<T> {
        if (this.containsUnitDefinition(type)) {
            return this.createUnit(type);
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
        let instance: T;
        let definition: UnitDefinition = this.getUnitDefinition(type);

        if (definition.factoryMethodName != null && definition.factoryUnitType != null) {
            instance = await this.createUnitWithFactory(definition.factoryUnitType, definition.factoryMethodName) as T;
        } else {
            let klass: Class<T> = Class.of(type);
            let args: any[] = await this.getParameterValues(klass.constructorParameters);

            instance = klass.instantiate(...args);
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
        let factoryClass: Class<object> = Class.of(factoryUnitType);
        let factoryMethod: Method = factoryClass.getMethod(factoryMethodName);
        let factoryInstance: object = await this.getUnit(factoryUnitType);
        let args = await this.getParameterValues(factoryMethod.parameters);

        return (factoryInstance as any)[factoryMethodName](...args);
    }


    private async getParameterValues(parameters: ReadOnlyMap<number, Parameter>): Promise<any[]> {
        let args = [];

        for (let {key, value: parameter} of parameters) {
            let parameterType: Type<any> | undefined = parameter.type;

            if (parameter.isDecoratedWith(DefaultType)) {
                let configuration: DefaultTypeConfiguration | undefined = parameter.getAttribute(DefaultTypeConfiguration.ATTRIBUTE_KEY);

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
