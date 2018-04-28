import {UnitDefinitionRegistry} from '../../UnitDefinitionRegistry';
import {UnitFactoryPostProcessor} from '../../../../unit/factory/configuration/UnitFactoryPostProcessor';


export interface UnitDefinitionRegistryPostProcessor extends UnitFactoryPostProcessor {
    /**
     * Modify the context's internal bean definition registry after its standard initialization.
     */
    postProcessUnitDefinitionRegistry(registry: UnitDefinitionRegistry): Promise<void>;
}
