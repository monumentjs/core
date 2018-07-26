import {UnitDefinitionRegistry} from '../registry/UnitDefinitionRegistry';
import {AbstractUnitDefinitionReader} from './AbstractUnitDefinitionReader';
import {UnitDefinitionReader} from './UnitDefinitionReader';
import {Collection} from '../../../collection/mutable/Collection';
import {Type} from '../../../Type';
import {Class} from '../../../reflection/Class';
import {UnitPostProcessorPattern} from '../../factory/configuration/UnitPostProcessorPattern';
import {UnitFactoryPostProcessorPattern} from '../../factory/configuration/UnitFactoryPostProcessorPattern';
import {UnitDefinitionRegistryPostProcessorPattern} from '../registry/configuration/UnitDefinitionRegistryPostProcessorPattern';


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
        const klass: Class<T> = Class.of(type);

        if (klass.matches(UnitPostProcessorPattern.get())) {
            this._unitPostProcessors.add(type);
        }

        if (klass.matches(UnitFactoryPostProcessorPattern.get())) {
            this._unitFactoryPostProcessors.add(type);
        }

        if (klass.matches(UnitDefinitionRegistryPostProcessorPattern.get())) {
            this._unitDefinitionRegistryPostProcessors.add(type);
        }
    }
}
