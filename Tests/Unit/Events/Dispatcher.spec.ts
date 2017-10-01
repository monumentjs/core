import {Dispatcher} from '../../../Source/Events/Dispatcher/Dispatcher';
import {IDisposable} from '../../../Source/Core/Abstraction/IDisposable';
import {Subscriber} from '../../../Source/Events/Dispatcher/Subscriber';


describe('Dispatcher', () => {
    let dispatcher: Dispatcher<object>;
    let testAction: object = {
        type: 'test'
    };


    beforeEach(() => {
        dispatcher = new Dispatcher();
    });


    describe('subscribe()', () => {
        it('returns subscription token', () => {
            let subscriber: Subscriber<object> = jest.fn();
            let subscription: IDisposable = dispatcher.subscribe(subscriber);

            expect(subscription).not.toEqual(null);
        });
    });


    describe('dispatch()', () => {
        it('publishes value to all subscribers', () => {
            let subscriber1: Subscriber<object> = jest.fn();
            let subscriber2: Subscriber<object> = jest.fn();

            let subscription1 = dispatcher.subscribe(subscriber1);
            let subscription2 = dispatcher.subscribe(subscriber2);

            dispatcher.dispatch(testAction);

            expect(subscriber1).toHaveBeenCalledTimes(1);
            expect(subscriber1).toHaveBeenCalledWith(testAction);

            expect(subscriber2).toHaveBeenCalledTimes(1);
            expect(subscriber2).toHaveBeenCalledWith(testAction);

            subscription1.dispose();

            dispatcher.dispatch(testAction);

            expect(subscriber1).toHaveBeenCalledTimes(1);
            expect(subscriber1).toHaveBeenCalledWith(testAction);

            expect(subscriber2).toHaveBeenCalledTimes(2);
            expect(subscriber2).toHaveBeenCalledWith(testAction);

            subscription2.dispose();

            dispatcher.dispatch(testAction);

            expect(subscriber1).toHaveBeenCalledTimes(1);
            expect(subscriber1).toHaveBeenCalledWith(testAction);

            expect(subscriber2).toHaveBeenCalledTimes(2);
            expect(subscriber2).toHaveBeenCalledWith(testAction);
        });
    });
});
