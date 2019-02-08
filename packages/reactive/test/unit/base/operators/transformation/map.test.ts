import { isEven } from '@monument/core';
import { map, Subject } from '../../../../..';
import { TestObserver } from '../../../../support/TestObserver';

describe('map()', function() {
    it('should emit mapped values', function() {
        const source: Subject<number> = new Subject();
        const observer: TestObserver<number> = new TestObserver();

        source.pipe(map(isEven)).subscribe(observer);

        expect(observer.next).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.next(0);
        source.next(1);
        source.next(2);
        source.next(3);

        expect(observer.next).toHaveBeenCalledTimes(4);
        expect(observer.next).toHaveBeenNthCalledWith(1, true);
        expect(observer.next).toHaveBeenNthCalledWith(2, false);
        expect(observer.next).toHaveBeenNthCalledWith(3, true);
        expect(observer.next).toHaveBeenNthCalledWith(4, false);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.complete();

        expect(observer.complete).toHaveBeenCalledTimes(1);
    });
});
