import {IObserver} from './IObserver';
import {IDisposable} from './IDisposable';


export interface IObservable<T> {
    subscribe(observer: IObserver<T>): IDisposable;
}
