import {HierarchicalUnitFactory} from '../unit/factory/HierarchicalUnitFactory';
import {ListableUnitFactory} from '../unit/factory/ListableUnitFactory';


export interface Context extends ListableUnitFactory, HierarchicalUnitFactory {

}
