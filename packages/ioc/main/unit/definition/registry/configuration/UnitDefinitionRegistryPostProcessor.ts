import {UnitDefinitionRegistry} from '../UnitDefinitionRegistry';


export interface UnitDefinitionRegistryPostProcessor {
    postProcessUnitDefinitionRegistry(registry: UnitDefinitionRegistry): Promise<void>;
}
