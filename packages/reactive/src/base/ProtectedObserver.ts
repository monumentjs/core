import { ObserverDecorator } from './ObserverDecorator';

export class ProtectedObserver<T> extends ObserverDecorator<T> {
    private _isComplete: boolean = false;
    private _isBroken: boolean = false;

    public get isBroken(): boolean {
        return this._isBroken;
    }

    public get isComplete(): boolean {
        return this._isComplete;
    }

    public complete(): void {
        if (this._isComplete === false) {
            this._isComplete = true;
            super.complete();
        }
    }

    public error(ex: Error): void {
        if (this._isBroken === false) {
            this._isBroken = true;
            super.error(ex);
        }
    }
}
