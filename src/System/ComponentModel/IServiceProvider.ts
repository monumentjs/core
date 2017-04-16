import {Constructor} from '../../Core/types';


export interface IServiceProvider {
    getService<T>(type: Constructor<T>): T;
}
