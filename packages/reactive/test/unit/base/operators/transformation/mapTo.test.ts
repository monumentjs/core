import { mapTo, Subject } from '../../../../..';
import { TestObserver } from '../../../../support/TestObserver';

describe('mapTo()', function() {
    it('should emit mapped values', function() {
        const source: Subject<number> = new Subject();
        const observer: TestObserver<number> = new TestObserver();

        source.pipe(mapTo(() => 10)).subscribe(observer);

        expect(observer.next).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.next(0);
        source.next(1);
        source.next(2);
        source.next(3);

        expect(observer.next).toHaveBeenCalledTimes(4);
        expect(observer.next).toHaveBeenNthCalledWith(1, 10);
        expect(observer.next).toHaveBeenNthCalledWith(2, 10);
        expect(observer.next).toHaveBeenNthCalledWith(3, 10);
        expect(observer.next).toHaveBeenNthCalledWith(4, 10);
        expect(observer.error).toHaveBeenCalledTimes(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);

        source.complete();

        expect(observer.complete).toHaveBeenCalledTimes(1);
    });
});
