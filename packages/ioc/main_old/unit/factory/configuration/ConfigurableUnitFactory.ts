import {HierarchicalUnitFactory} from '../HierarchicalUnitFactory';
import {SingletonUnitRegistry} from './SingletonUnitRegistry';
import {UnitPostProcessor} from '../../../../unit/factory/configuration/UnitPostProcessor';
import {UnitFactory} from '../UnitFactory';


export interface ConfigurableUnitFactory extends HierarchicalUnitFactory, SingletonUnitRegistry {
    parentUnitFactory: UnitFactory | undefined;
    readonly unitPostProcessorsCount: number;
    addUnitPostProcessor(postProcessor: UnitPostProcessor): void;
    destroyUnit(unitName: string, unitInstance: object): Promise<void>;
}
