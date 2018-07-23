import {UnitDefinitionRegistry} from '../UnitDefinitionRegistry';


export interface UnitDefinitionRegistryPostProcessor {
    [UnitDefinitionRegistryPostProcessor.postProcessUnitDefinitionRegistry](registry: UnitDefinitionRegistry): Promise<void>;
}

export namespace UnitDefinitionRegistryPostProcessor {
    export const postProcessUnitDefinitionRegistry = Symbol();
}
