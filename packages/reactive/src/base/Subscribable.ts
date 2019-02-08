import { Observer } from './Observer';
import { Unsubscribable } from './Unsubscribable';

export type OnNext<T> = (value: T) => void;

export type OnError = (error: Error) => void;

export type OnComplete = () => void;

export interface Subscribable<T> {
    subscribe(observer: Partial<Observer<T>>): Unsubscribable;

    subscribe(next?: OnNext<T>, error?: OnError, complete?: OnComplete): Unsubscribable;
}
