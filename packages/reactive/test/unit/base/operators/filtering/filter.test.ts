import {isEven} from '@monument/core';
import {filter, Subject} from '../../../../..';
import {TestObserver} from '../../../../support/TestObserver';

describe('filter()', function () {
    it('should emit values which pass predicate', function () {
        const source: Subject<number> = new Subject();
        const observer: TestObserver<number> = new TestObserver();

        source.pipe(filter(isEven)).subscribe(observer);

        expect(observer.next).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.next(0);
        source.next(1);
        source.next(2);
        source.next(3);

        expect(observer.next).toHaveBeenCalledTimes(2);
        expect(observer.next).toHaveBeenNthCalledWith(1, 0);
        expect(observer.next).toHaveBeenNthCalledWith(2, 2);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);
    });
});
