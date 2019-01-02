import {Observable} from './Observable';
import {Observer} from './Observer';

export interface Subject<T> extends Observable<T>, Observer<T> {

}
