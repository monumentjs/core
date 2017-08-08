import {ISingletonConfiguration} from './ISingletonConfiguration';


export interface IUnitConfiguration<T> extends ISingletonConfiguration<T> {
    isSingleton?: boolean;
}
