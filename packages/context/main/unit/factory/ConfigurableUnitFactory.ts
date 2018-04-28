import {UnitDefinitionRegistry} from '../definition/registry/UnitDefinitionRegistry';
import {HierarchicalUnitFactory} from './HierarchicalUnitFactory';
import {UnitFactory} from './UnitFactory';
import {UnitPostProcessor} from './configuration/UnitPostProcessor';


export interface ConfigurableUnitFactory extends UnitFactory, HierarchicalUnitFactory, UnitDefinitionRegistry {
    readonly unitPostProcessorCount: number;

    addUnitPostProcessor(postProcessor: UnitPostProcessor): void;
}
