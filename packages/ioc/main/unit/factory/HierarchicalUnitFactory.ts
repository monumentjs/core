import {UnitFactory} from './UnitFactory';


export interface HierarchicalUnitFactory extends UnitFactory {
    parent: UnitFactory | undefined;
}
