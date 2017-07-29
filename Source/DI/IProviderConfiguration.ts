import {ProviderToken} from './types';


export interface IProviderConfiguration<T> {
    id?: string;
    providers?: Array<ProviderToken<any>>;
    isSingleton?: boolean;
    get?: () => T;
}
