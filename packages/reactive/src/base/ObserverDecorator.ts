import { Observer } from './Observer';

export abstract class ObserverDecorator<T> implements Observer<T> {
    private readonly _ref: Observer<T>;

    public constructor(ref: Observer<T>) {
        this._ref = ref;
    }

    public complete(): void {
        this._ref.complete();
    }

    public error(ex: Error): void {
        this._ref.error(ex);
    }

    public next(value: T): void {
        this._ref.next(value);
    }
}
