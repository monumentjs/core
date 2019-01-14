import {Subject} from './Subject';
import {Observer} from './Observer';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class BehaviorSubject<T> extends Subject<T> {
    private _value: T;

    public get value(): T {
        return this._value;
    }

    public constructor(value: T) {
        super((observer: Observer<T>) => {
            observer.next(this.value);
        });

        this._value = value;
    }

    public next(value: T): void {
        this._value = value;

        super.next(value);
    }
}
