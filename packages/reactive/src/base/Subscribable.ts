import {Observer} from './Observer';
import {Subscription} from './Subscription';

export type OnNext<T> = (value: T) => void;

export type OnError = (error: Error) => void;

export type OnComplete = () => void;

export interface Subscribable<T> {

    subscribe(observer: Observer<T>): Subscription<T>;

    subscribe(next?: OnNext<T>, error?: OnError, complete?: OnComplete): Subscription<T>;

    unsubscribe(observer: Observer<T>): boolean;
}
