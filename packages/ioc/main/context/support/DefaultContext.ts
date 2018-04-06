import {Type} from '@monument/core/main/Type';
import {Collection} from '../../../../collections/main/Collection';
import {List} from '../../../../collections/main/List';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {DefaultUnitFactory} from '../../unit/factory/support/DefaultUnitFactory';
import {UnitPostProcessor} from '../../unit/factory/configuration/UnitPostProcessor';
import {UnitFactoryPostProcessor} from '../../unit/factory/configuration/UnitFactoryPostProcessor';
import {UnitDefinitionRegistry} from '../../unit/definition/registry/UnitDefinitionRegistry';
import {UnitDefinitionRegistryPostProcessor} from '../../unit/definition/registry/configuration/UnitDefinitionRegistryPostProcessor';
import {DefaultUnitDefinitionRegistry} from '../../unit/definition/registry/DefaultUnitDefinitionRegistry';
import {UnitDefinitionReader} from '../../unit/definition/reader/UnitDefinitionReader';
import {ComponentUnitDefinitionReader} from '../../unit/definition/reader/ComponentUnitDefinitionReader';
import {ConfigurationUnitDefinitionReader} from '../../unit/definition/reader/ConfigurationUnitDefinitionReader';
import {PostProcessorUnitDefinitionReader} from '../../unit/definition/reader/PostProcessorUnitDefinitionReader';
import {Context} from '../Context';
import {ConfigurableContext} from '../ConfigurableContext';


export class DefaultContext implements ConfigurableContext {
    private _parent: Context | undefined;

    private _isRunning: boolean = false;

    private readonly _unitDefinitionReaders: Collection<UnitDefinitionReader> = new ArrayList();
    private readonly _unitDefinitionRegistry: UnitDefinitionRegistry;
    private readonly _unitFactory: DefaultUnitFactory;

    private readonly _unitDefinitionRegistryPostProcessorTypes: List<Type<object>> = new ArrayList();
    private readonly _unitFactoryPostProcessorTypes: List<Type<object>> = new ArrayList();
    private readonly _unitPostProcessorTypes: List<Type<object>> = new ArrayList();

    private readonly _unitDefinitionRegistryPostProcessors: List<UnitDefinitionRegistryPostProcessor> = new ArrayList();
    private readonly _unitFactoryPostProcessors: List<UnitFactoryPostProcessor> = new ArrayList();
    private readonly _unitPostProcessors: List<UnitPostProcessor> = new ArrayList();


    public get parent(): Context | undefined {
        return this._parent;
    }


    public set parent(value: Context | undefined) {
        this._parent = value;

        if (value == null) {
            this._unitFactory.parent = undefined;
        } else {
            this._unitFactory.parent = value;
        }
    }


    public get isRunning(): boolean {
        return this._isRunning;
    }


    protected get unitDefinitionRegistry(): UnitDefinitionRegistry {
        return this._unitDefinitionRegistry;
    }


    public constructor() {
        this._unitDefinitionRegistry = new DefaultUnitDefinitionRegistry();
        this._unitFactory = new DefaultUnitFactory(this._unitDefinitionRegistry);

        this.addUnitDefinitionReader(
            new PostProcessorUnitDefinitionReader(
                this._unitDefinitionRegistry,
                this,
                this._unitPostProcessorTypes,
                this._unitFactoryPostProcessorTypes,
                this._unitDefinitionRegistryPostProcessorTypes
            )
        );
        this.addUnitDefinitionReader(
            new ComponentUnitDefinitionReader(
                this._unitDefinitionRegistry,
                this
            )
        );
        this.addUnitDefinitionReader(
            new ConfigurationUnitDefinitionReader(
                this._unitDefinitionRegistry,
                this
            )
        );
    }


    public async start(): Promise<void> {
        if (!this._isRunning) {
            await this.instantiatePostProcessors();
            await this.postProcessUnitDefinitionRegistry();
            await this.postProcessUnitFactory();
            await this.instantiateSingletons();

            this._isRunning = true;
        }
    }


    public async stop(): Promise<void> {
        // TODO: destroy units using definitions
    }


    public getUnit<T extends object>(type: Type<T>): Promise<T> {
        return this._unitFactory.getUnit(type);
    }


    public containsUnit<T extends object>(type: Type<T>): boolean {
        return this._unitFactory.containsUnit(type);
    }


    public destroyUnit<T extends object>(type: Type<T>, instance: T): void {
        return this._unitFactory.destroyUnit(type, instance);
    }


    public scan<T extends object>(type: Type<T>): void {
        for (let reader of this._unitDefinitionReaders) {
            reader.scan(type);
        }
    }


    protected addUnitDefinitionReader(reader: UnitDefinitionReader): void {
        this._unitDefinitionReaders.add(reader);
    }


    protected addUnitPostProcessor(postProcessor: UnitPostProcessor): void {
        this._unitFactory.addUnitPostProcessor(postProcessor);
    }


    private async instantiatePostProcessors(): Promise<void> {
        this._unitDefinitionRegistryPostProcessors.addAll(
            await Promise.all(
                this._unitDefinitionRegistryPostProcessorTypes.select((type) => {
                    return this.getUnit(type) as Promise<UnitDefinitionRegistryPostProcessor>;
                })
            )
        );

        this._unitFactoryPostProcessors.addAll(
            await Promise.all(
                this._unitFactoryPostProcessorTypes.select((type) => {
                    return this.getUnit(type) as Promise<UnitFactoryPostProcessor>;
                })
            )
        );

        this._unitPostProcessors.addAll(
            await Promise.all(
                this._unitDefinitionRegistryPostProcessorTypes.select((type) => {
                    return this.getUnit(type) as Promise<UnitPostProcessor>;
                })
            )
        );

        for (let postProcessor of this._unitPostProcessors) {
            this._unitFactory.addUnitPostProcessor(postProcessor);
        }
    }


    private async postProcessUnitDefinitionRegistry(): Promise<void> {
        for (let processor of this._unitDefinitionRegistryPostProcessors) {
            await processor.postProcessUnitDefinitionRegistry(this._unitDefinitionRegistry);
        }
    }


    private async postProcessUnitFactory(): Promise<void> {
        for (let processor of this._unitFactoryPostProcessors) {
            await processor.postProcessUnitFactory(this._unitFactory);
        }
    }


    private async instantiateSingletons(): Promise<void> {
        for (let type of this._unitDefinitionRegistry.unitTypes) {
            let definition = this._unitDefinitionRegistry.getUnitDefinition(type);

            if (definition.isSingleton && !definition.isLazyInit) {
                await this.getUnit(type);
            }
        }
    }
}
