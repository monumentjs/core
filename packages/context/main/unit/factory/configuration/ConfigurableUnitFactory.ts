import {UnitDefinitionRegistry} from '../../definition/registry/UnitDefinitionRegistry';
import {HierarchicalUnitFactory} from '../HierarchicalUnitFactory';
import {SingletonUnitRegistry} from './SingletonUnitRegistry';
import {UnitPostProcessor} from './UnitPostProcessor';
import {UnitFactory} from '../UnitFactory';


export interface ConfigurableUnitFactory extends UnitFactory, HierarchicalUnitFactory, UnitDefinitionRegistry, SingletonUnitRegistry {
    addUnitPostProcessor(postProcessor: UnitPostProcessor): void;
}
