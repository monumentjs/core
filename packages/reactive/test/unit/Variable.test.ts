import {Variable} from '../..';
import {TestObserver} from '../support/TestObserver';

describe('Variable', function () {
    it('updates value', function () {
        const variable: Variable<number> = new Variable(0);

        expect(variable.value).toBe(0);

        variable.next(1);

        expect(variable.value).toBe(1);
    });

    it('populates new subscriber with current value', function () {
        const observer = new TestObserver();
        const variable: Variable<number> = new Variable(0);

        variable.subscribe(observer);

        expect(observer.next).toHaveBeenCalledTimes(1);
        expect(observer.next).toHaveBeenLastCalledWith(0);
        expect(observer.complete).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);
    });

    it('notifies subscribers only when value changed', function () {
        const observer = new TestObserver();
        const variable: Variable<number> = new Variable(0);

        variable.subscribe(observer);

        variable.next(0);

        expect(observer.next).toHaveBeenCalledTimes(1);
        expect(observer.complete).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);

        variable.next(1);

        expect(observer.next).toHaveBeenCalledTimes(2);
        expect(observer.complete).toHaveBeenCalledTimes(0);
        expect(observer.error).toHaveBeenCalledTimes(0);
    });
});
