import {Constructor} from '../../types';
import {UnitProvider} from '../Providers/UnitProvider';


export interface IContainerProxy {
    hasProvider<T>(type: Constructor<T>): boolean;
    getProvider<T>(type: Constructor<T>): UnitProvider<T>;
}
