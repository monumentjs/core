import {AbstractObservable} from './AbstractObservable';
import {Subject} from './Subject';

export class SimpleSubject<T> extends AbstractObservable<T> implements Subject<T> {
    public next(value: T): void {
        for (const observer of this) {
            observer.next(value);
        }
    }

    public complete(): void {
        for (const observer of this) {
            observer.complete();
        }
    }

    public error(error: Error): void {
        for (const observer of this) {
            observer.error(error);
        }
    }
}
