import {sleep} from '@monument/core';
import {mapAsync, Subject} from '../../../../..';
import {TestObserver} from '../../../../support/TestObserver';

describe('mapAsync()', function () {
    it('should emit promise values', async function () {
        const source: Subject<number> = new Subject();
        const observer: TestObserver<number> = new TestObserver();

        source.pipe(mapAsync(async (n: number) => {
            return -n;
        })).subscribe(observer);

        expect(observer.next).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.next(1);
        source.next(2);
        source.next(3);
        source.next(4);

        await sleep(1);

        expect(observer.next).toHaveBeenCalledTimes(4);
        expect(observer.next).toHaveBeenNthCalledWith(1, -1);
        expect(observer.next).toHaveBeenNthCalledWith(2, -2);
        expect(observer.next).toHaveBeenNthCalledWith(3, -3);
        expect(observer.next).toHaveBeenNthCalledWith(4, -4);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.complete();

        expect(observer.complete).toHaveBeenCalledTimes(1);
    });
});
