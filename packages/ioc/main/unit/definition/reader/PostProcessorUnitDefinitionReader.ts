import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {Collection} from '@monument/collections/main/Collection';
import {UnitDefinitionRegistry} from '../registry/UnitDefinitionRegistry';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';
import {UnitDefinitionReader} from './UnitDefinitionReader';


export class PostProcessorUnitDefinitionReader extends AbstractUnitDefinitionReader {
    private static readonly UNIT_POST_PROCESSOR_METHODS: string[] = [
        'postProcessBeforeInitialization',
        'postProcessAfterInitialization'
    ];

    private static readonly UNIT_FACTORY_POST_PROCESSOR_METHODS: string[] = [
        'postProcessUnitFactory'
    ];

    private static readonly UNIT_DEFINITION_REGISTRY_POST_PROCESSOR_METHODS: string[] = [
        'postProcessUnitDefinitionRegistry'
    ];


    private readonly _unitPostProcessors: Collection<Type<object>>;
    private readonly _unitFactoryPostProcessors: Collection<Type<object>>;
    private readonly _unitDefinitionRegistryPostProcessors: Collection<Type<object>>;


    public constructor(
        registry: UnitDefinitionRegistry,
        rootReader: UnitDefinitionReader,
        unitPostProcessors: Collection<Type<object>>,
        unitFactoryPostProcessors: Collection<Type<object>>,
        unitDefinitionRegistryPostProcessors: Collection<Type<object>>
    ) {
        super(registry, rootReader);

        this._unitPostProcessors = unitPostProcessors;
        this._unitFactoryPostProcessors = unitFactoryPostProcessors;
        this._unitDefinitionRegistryPostProcessors = unitDefinitionRegistryPostProcessors;
    }


    public scan<T extends object>(type: Type<T>): void {
        let klass: Class<T> = Class.of(type);

        if (this.hasMethods(klass, PostProcessorUnitDefinitionReader.UNIT_POST_PROCESSOR_METHODS)) {
            this._unitPostProcessors.add(type);
        }

        if (this.hasMethods(klass, PostProcessorUnitDefinitionReader.UNIT_FACTORY_POST_PROCESSOR_METHODS)) {
            this._unitFactoryPostProcessors.add(type);
        }

        if (this.hasMethods(klass, PostProcessorUnitDefinitionReader.UNIT_DEFINITION_REGISTRY_POST_PROCESSOR_METHODS)) {
            this._unitDefinitionRegistryPostProcessors.add(type);
        }
    }

    // TODO: use InterfaceBuilder and specific Interface implementations to test post processors
    private hasMethods(klass: Class<any>, methods: string[]): boolean {
        return methods.every((method: string): boolean => {
            return klass.hasMethod(method);
        });
    }
}
