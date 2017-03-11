import {Constructor} from '../../Core/types';


export interface IServiceProvider {
    getService(type: Constructor): object;
}
