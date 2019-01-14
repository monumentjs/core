import {sleep} from '@monument/core';
import {async, Subject} from '../../../../..';
import {TestObserver} from '../../../../support/TestObserver';

describe('async()', function () {
    it('should emit promise values', async function () {
        const source: Subject<Promise<number>> = new Subject();
        const observer: TestObserver<number> = new TestObserver();

        source.pipe(async()).subscribe(observer);

        expect(observer.next).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.next(Promise.resolve(0));
        source.next(Promise.resolve(1));
        source.next(Promise.resolve(2));
        source.next(Promise.resolve(3));

        await sleep(1);

        expect(observer.next).toHaveBeenCalledTimes(4);
        expect(observer.next).toHaveBeenNthCalledWith(1, 0);
        expect(observer.next).toHaveBeenNthCalledWith(2, 1);
        expect(observer.next).toHaveBeenNthCalledWith(3, 2);
        expect(observer.next).toHaveBeenNthCalledWith(4, 3);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);
    });
});
