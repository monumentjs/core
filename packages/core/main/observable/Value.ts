import {Observable} from './Observable';


export interface Value<T> extends Observable<T> {
    get(): T;
    set(value: T): void;
}
