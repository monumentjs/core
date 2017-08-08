import {UnitFactoryFunction} from './types';
import {Constructor} from '../../types';


export interface ISingletonConfiguration<T> {
    providers?: Array<Constructor<any>>;
    factory?: UnitFactoryFunction<T>;
}
