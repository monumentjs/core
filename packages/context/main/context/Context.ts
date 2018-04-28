import {Lifecycle} from '@monument/core/main/Lifecycle';
import {Method} from '@monument/reflection/main/Method';
import {UnitFactory} from '../unit/factory/UnitFactory';


export interface Context extends UnitFactory, Lifecycle {
    parent: Context | undefined;

    invoke(method: Method, self: object): Promise<any>;
}
