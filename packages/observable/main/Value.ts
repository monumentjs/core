import {Supplier} from '@monument/core/main/Supplier';
import {Observable} from './Observable';


export interface Value<T> extends Supplier<T>, Observable<T> {
    set(value: T): void;
}
