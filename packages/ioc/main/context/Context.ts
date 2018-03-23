import {UnitFactory} from '../unit/factory/UnitFactory';
import {Lifecycle} from './Lifecycle';


export interface Context extends UnitFactory, Lifecycle {
    parent: Context | undefined;
}
