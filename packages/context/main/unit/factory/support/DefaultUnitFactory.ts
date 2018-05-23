import {Type} from '@monument/core/main/Type';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {PreDestroy} from '@monument/stereotype/main/PreDestroy';
import {Destroy} from '@monument/stereotype/main/Destroy';
import {PostConstruct} from '@monument/stereotype/main/PostConstruct';
import {Init} from '@monument/stereotype/main/Init';
import {UnitDefinition} from '../../definition/UnitDefinition';
import {UnitDefinitionRegistry} from '../../definition/registry/UnitDefinitionRegistry';
import {NoSuchUnitDefinitionException} from '../../NoSuchUnitDefinitionException';
import {UnitPostProcessor} from '../configuration/UnitPostProcessor';
import {ConfigurableListableUnitFactory} from '../configuration/ConfigurableListableUnitFactory';
import {UnitFactory} from '../UnitFactory';
import {DefaultSingletonUnitRegistry} from './DefaultSingletonUnitRegistry';
import {MethodInvoker} from './MethodInvoker';
import {UnitRequest} from '../UnitRequest';


export class DefaultUnitFactory implements ConfigurableListableUnitFactory {
    private _parent: UnitFactory | undefined;
    private readonly _unitDefinitionRegistry: UnitDefinitionRegistry;
    private readonly _methodInvoker: MethodInvoker = new MethodInvoker(this);
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
                await this._methodInvoker.invoke(request, instance, method);
            }
        }

        for (const method of methods) {
            if (method.isDecoratedWith(Destroy)) {
                await this._methodInvoker.invoke(request, instance, method);
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
            let args: any[] = await this._methodInvoker.getArguments(request, klass.constructorParameters);

            instance = klass.instantiate(...args);
        }

        // TODO: set property values
        // TODO: After Properties Set phase

        for (const method of methods) {
            if (method.isDecoratedWith(PostConstruct)) {
                await this._methodInvoker.invoke(request, instance, method);
            }
        }

        for (const processor of this._unitPostProcessors) {
            instance = await processor.postProcessBeforeInitialization(instance, unitType);
        }

        for (const method of methods) {
            if (method.isDecoratedWith(Init)) {
                await this._methodInvoker.invoke(request, instance, method);
            }
        }

        for (const processor of this._unitPostProcessors) {
            instance = await processor.postProcessAfterInitialization(instance, unitType);
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

        return this._methodInvoker.invoke(request.next(factoryUnitType), factoryInstance, factoryMethod);
    }

}
