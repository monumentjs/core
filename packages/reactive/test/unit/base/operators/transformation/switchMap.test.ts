import {switchMap, Subject, Observable} from '../../../../..';
import {TestObserver} from '../../../../support/TestObserver';

describe('switchMap()', function () {
    it('should emit mapped values', function () {
        const source: Subject<number> = new Subject();
        const observer: TestObserver<number> = new TestObserver();

        source.pipe(switchMap((num) => Observable.of(-num, -num - 1))).subscribe(observer);

        expect(observer.next).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.next(1);
        source.next(2);
        source.next(3);
        source.next(4);

        expect(observer.next).toHaveBeenCalledTimes(8);
        expect(observer.next).toHaveBeenNthCalledWith(1, -1);
        expect(observer.next).toHaveBeenNthCalledWith(2, -2);
        expect(observer.next).toHaveBeenNthCalledWith(3, -2);
        expect(observer.next).toHaveBeenNthCalledWith(4, -3);
        expect(observer.next).toHaveBeenNthCalledWith(5, -3);
        expect(observer.next).toHaveBeenNthCalledWith(6, -4);
        expect(observer.next).toHaveBeenNthCalledWith(7, -4);
        expect(observer.next).toHaveBeenNthCalledWith(8, -5);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.complete();

        expect(observer.complete).toHaveBeenCalledTimes(1);
    });
});
