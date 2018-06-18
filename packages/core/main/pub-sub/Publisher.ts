import {Subscriber} from './Subscriber';


export interface Publisher<T> {
    notify(value: T): void;
    attach(subscriber: Subscriber<T>): boolean;
    detach(subscriber: Subscriber<T>): boolean;
}
