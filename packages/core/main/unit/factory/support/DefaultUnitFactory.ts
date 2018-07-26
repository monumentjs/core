import {UnitDefinition} from '../../definition/UnitDefinition';
import {UnitDefinitionRegistry} from '../../definition/registry/UnitDefinitionRegistry';
import {NoSuchUnitDefinitionException} from '../../NoSuchUnitDefinitionException';
import {UnitPostProcessor} from '../configuration/UnitPostProcessor';
import {ConfigurableListableUnitFactory} from '../configuration/ConfigurableListableUnitFactory';
import {UnitFactory} from '../UnitFactory';
import {DefaultSingletonUnitRegistry} from './DefaultSingletonUnitRegistry';
import {UnitRequest} from '../UnitRequest';
import {ArrayList} from '../../../collection/mutable/ArrayList';
import {ReadOnlyMap} from '../../../collection/readonly/ReadOnlyMap';
import {Type} from '../../../Type';
import {PreDestroy} from '../../../stereotype/lifecycle/PreDestroy';
import {Method} from '../../../reflection/Method';
import {ReadOnlyCollection} from '../../../collection/readonly/ReadOnlyCollection';
import {Class} from '../../../reflection/Class';
import {Destroy} from '../../../stereotype/lifecycle/Destroy';
import {PostConstruct} from '../../../stereotype/lifecycle/PostConstruct';
import {Init} from '../../../stereotype/lifecycle/Init';
import {ReadOnlyList} from '../../../collection/readonly/ReadOnlyList';
import {Parameter} from '../../../reflection/Parameter';
import {Invokable} from '../../../reflection/Invokable';
import {InitializingUnitPattern} from '../InitializingUnitPattern';
import {InitializingUnit} from '../InitializingUnit';


export class DefaultUnitFactory implements ConfigurableListableUnitFactory {
    private _parent: UnitFactory | undefined;
    private readonly _unitDefinitionRegistry: UnitDefinitionRegistry;
    private readonly _unitPostProcessors: ArrayList<UnitPostProcessor> = new ArrayList();
    private readonly _singletonRegistry: DefaultSingletonUnitRegistry = new DefaultSingletonUnitRegistry();


    public get unitDefinitions(): ReadOnlyMap<Type<object>, UnitDefinition> {
        return this._unitDefinitionRegistry.unitDefinitions;
    }


    public get singletons(): ReadOnlyMap<Type<object>, object> {
        return this._singletonRegistry.singletons;
    }


    public get parent(): UnitFactory | undefined {
        return this._parent;
    }


    public set parent(value: UnitFactory | undefined) {
        this._parent = value;
    }


    public constructor(registry: UnitDefinitionRegistry) {
        this._unitDefinitionRegistry = registry;
    }


    public containsSingleton(unitType: Type<object>): boolean {
        return this._singletonRegistry.containsSingleton(unitType);
    }


    public getSingleton<T extends object>(unitType: Type<T>): T | undefined {
        return this._singletonRegistry.getSingleton(unitType);
    }


    public registerSingleton<T extends object>(unitType: Type<T>, unitObject: T): void {
        this._singletonRegistry.registerSingleton(unitType, unitObject);
    }


    public addUnitPostProcessor(postProcessor: UnitPostProcessor): void {
        this._unitPostProcessors.add(postProcessor);
    }


    public containsUnit(unitType: Type<object>): boolean {
        return this._unitDefinitionRegistry.containsUnitDefinition(unitType);
    }


    public async destroyUnit<T extends object>(unitType: Type<T>, instance: T): Promise<void> {
        const klass: Class<object> = Class.of(unitType);
        const methods: ReadOnlyCollection<Method> = klass.methods;
        const request: UnitRequest<T> = new UnitRequest(unitType);

        for (const method of methods) {
            if (method.isDecoratedWith(PreDestroy)) {
                await this.invoke(request, instance, method);
            }
        }

        for (const method of methods) {
            if (method.isDecoratedWith(Destroy)) {
                await this.invoke(request, instance, method);
            }
        }
    }


    public async getUnit<T extends object>(request: UnitRequest<T> | Type<T>): Promise<T> {
        if (typeof request === 'function') {
            request = new UnitRequest(request);
        }

        const unitType: Type<T> = request.type;

        if (this.containsUnitDefinition(unitType)) {
            const definition: UnitDefinition = this.getUnitDefinition(unitType);

            if (definition.isSingleton) {
                let singleton: T | undefined = this._singletonRegistry.getSingleton(unitType);

                if (singleton == null) {
                    singleton = await this.createUnit(request);

                    this._singletonRegistry.registerSingleton(request.type, singleton);
                }

                return singleton;
            } else {
                return this.createUnit(request);
            }
        }

        if (this.parent != null) {
            return this.parent.getUnit(request);
        }

        throw new NoSuchUnitDefinitionException(`Definition for "${request.toString()}" not found.`);
    }


    // ConfigurableUnitFactory

    public async preInstantiateSingletons(): Promise<void> {
        for (const {key: type, value: definition} of this._unitDefinitionRegistry.unitDefinitions) {
            if (definition.isSingleton && !definition.isLazyInit) {
                await this.getUnit(new UnitRequest(type));
            }
        }
    }


    // UnitDefinitionRegistry

    public registerUnitDefinition(type: Type<object>, definition: UnitDefinition): void {
        this._unitDefinitionRegistry.registerUnitDefinition(type, definition);
    }


    public containsUnitDefinition(type: Type<object>): boolean {
        return this._unitDefinitionRegistry.containsUnitDefinition(type);
    }


    public getUnitDefinition(type: Type<object>): UnitDefinition {
        return this._unitDefinitionRegistry.getUnitDefinition(type);
    }


    // Method invocation

    public async invoke(request: UnitRequest<object>, self: object, method: Invokable): Promise<any> {
        const args: any[] = await this.getArguments(request, method.parameters);

        return method.invoke(self, args);
    }


    public async getArguments(request: UnitRequest<object>, parameters: ReadOnlyList<Parameter>): Promise<any[]> {
        const args: any[] = [];

        for (let index = 0; index < parameters.length; index++) {
            const parameter: Parameter = parameters.getAt(index);

            if (parameter.type != null) {
                args[index] = await this.getUnit(request.next(parameter.type));
            }
        }

        return args;
    }


    private async createUnit<T extends object>(request: UnitRequest<T>): Promise<T> {
        const unitType: Type<T> = request.type;
        const definition: UnitDefinition = this.getUnitDefinition(unitType);
        const klass: Class<T> = Class.of(unitType);
        const methods: ReadOnlyCollection<Method> = klass.methods;
        let instance: T;

        if (definition.factoryMethodName != null && definition.factoryUnitType != null) {
            instance = await this.createUnitWithFactory(
                request,
                definition.factoryUnitType,
                definition.factoryMethodName
            ) as T;
        } else {
            let args: any[] = await this.getArguments(request, klass.constructorParameters);

            instance = klass.instantiate(...args);
        }

        // TODO: set property values

        if (InitializingUnitPattern.get().test(instance)) {
            const method: Method = klass.getMethod(InitializingUnit.afterPropertiesSet);

            await this.invoke(request, instance, method);
        }

        for (const method of methods) {
            if (method.isDecoratedWith(PostConstruct)) {
                await this.invoke(request, instance, method);
            }
        }

        for (const processor of this._unitPostProcessors) {
            instance = await processor[UnitPostProcessor.postProcessBeforeInitialization](instance, unitType);
        }

        for (const method of methods) {
            if (method.isDecoratedWith(Init)) {
                await this.invoke(request, instance, method);
            }
        }

        for (const processor of this._unitPostProcessors) {
            instance = await processor[UnitPostProcessor.postProcessAfterInitialization](instance, unitType);
        }

        return instance;
    }


    private async createUnitWithFactory<T extends object>(
        request: UnitRequest<object>,
        factoryUnitType: Type<T>,
        factoryMethodName: string | symbol
    ): Promise<object> {
        const factoryRequest: UnitRequest<object> = request.next(factoryUnitType);
        const factoryClass: Class<T> = Class.of(factoryUnitType);
        const factoryMethod: Method = factoryClass.getMethod(factoryMethodName);
        const factoryInstance: object = await this.getUnit(factoryRequest);

        return this.invoke(request.next(factoryUnitType), factoryInstance, factoryMethod);
    }
}
