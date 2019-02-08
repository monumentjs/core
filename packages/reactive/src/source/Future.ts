import { Observer } from '../base/Observer';
import { Observable } from '../base/Observable';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class Future<T> extends Observable<T> {
    public constructor(promise: Promise<T>) {
        super((observer: Observer<T>) => {
            promise.then(
                (value: T) => {
                    observer.next(value);
                    observer.complete();
                },
                (reason: Error) => {
                    observer.error(reason);
                }
            );
        });
    }
}
