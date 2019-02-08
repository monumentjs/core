import { ProjectFunction } from '@monument/core';
import { Observable, OperatorFunction } from '../../base/Observable';
import { Subject } from '../../base/Subject';
import { Observer } from '../../base/Observer';
import { Subscription } from '../../base/Subscription';

export function switchMap<I, O>(project: ProjectFunction<I, Observable<O>>): OperatorFunction<I, O> {
    return (source: Observable<I>): Observable<O> => {
        return new Subject((observer: Observer<O>) => {
            let altSourceSubscription: Subscription | undefined;

            const sourceSubscription = source.subscribe({
                next(input: I) {
                    cancelAltSourceSubscription();

                    altSourceSubscription = project(input).subscribe((output: O) => {
                        observer.next(output);
                    });
                },
                error(error) {
                    observer.error(error);
                },
                complete() {
                    observer.complete();
                }
            });

            function cancelAltSourceSubscription() {
                if (altSourceSubscription) {
                    altSourceSubscription.unsubscribe();
                    altSourceSubscription = undefined;
                }
            }

            sourceSubscription.add(cancelAltSourceSubscription);

            return sourceSubscription;
        });
    };
}
