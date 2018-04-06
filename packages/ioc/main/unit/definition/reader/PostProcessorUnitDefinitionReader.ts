import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {Collection} from '../../../../../collections/main/Collection';
import {PostProcessor} from '../../configuration/decorators/PostProcessor';
import {PostProcessorDecoratorConfiguration} from '../../configuration/decorators/PostProcessorDecoratorConfiguration';
import {PostProcessorTarget} from '../../configuration/decorators/PostProcessorTarget';
import {UnitDefinitionRegistry} from '../registry/UnitDefinitionRegistry';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';
import {UnitDefinitionReader} from './UnitDefinitionReader';


export class PostProcessorUnitDefinitionReader extends AbstractUnitDefinitionReader {
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

        if (klass.isDecoratedWith(PostProcessor)) {
            let configuration = klass.getAttribute(PostProcessorDecoratorConfiguration.ATTRIBUTE_KEY);

            if (configuration != null) {
                if (configuration.targets.contains(PostProcessorTarget.UNIT)) {
                    this._unitPostProcessors.add(type);
                }

                if (configuration.targets.contains(PostProcessorTarget.UNIT_FACTORY)) {
                    this._unitFactoryPostProcessors.add(type);
                }

                if (configuration.targets.contains(PostProcessorTarget.UNIT_DEFINITION_REGISTRY)) {
                    this._unitDefinitionRegistryPostProcessors.add(type);
                }
            }
        }
    }
}
