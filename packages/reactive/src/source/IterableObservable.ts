import { Observable } from '../base/Observable';
import { Observer } from '../base/Observer';

export class IterableObservable<T> extends Observable<T> {
    public constructor(items: Iterable<T>) {
        super((observer: Observer<T>) => {
            for (const value of items) {
                observer.next(value);
            }

            observer.complete();
        });
    }
}
