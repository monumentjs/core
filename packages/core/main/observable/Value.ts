import {Observable} from './Observable';
import {Supplier} from '../Supplier';


export interface Value<T> extends Supplier<T>, Observable<T> {
    set(value: T): void;
}
