import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';
import {UnitFactory} from '../unit/factory/UnitFactory';


export interface Context extends UnitFactory, Lifecycle {
    parent: Context | undefined;
}
