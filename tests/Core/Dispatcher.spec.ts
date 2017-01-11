import Dispatcher, {IAction, IActionListener, IActionListenerCancel} from '../../lib/Core/Dispatcher';


describe('Core.Dispatcher', () => {
    let dispatcher: Dispatcher<IAction, IActionListener<IAction>> = null;
    let listener: IActionListener<IAction> = null;
    let cancel: IActionListenerCancel = null;
    let cancelResult: boolean;
    let testAction: IAction = {
        type: 'test'
    };


    beforeEach(() => {
        expect(function() {
            dispatcher = new Dispatcher();
        }).not.toThrow();
    });


    describe('#constructor()', () => {
        it('should create new instance of Dispatcher class', () => {
            expect(dispatcher).toBeInstanceOf(Dispatcher);
        });
    });


    describe('#subscribe(listener)', () => {
        it('should attach listener', () => {
            listener = jest.fn();

            expect(function() {
                dispatcher.subscribe(listener);
            }).not.toThrow();
        });


        it('should return cancellation function', () => {
            listener = jest.fn();

            expect(function() {
                cancel = dispatcher.subscribe(listener);
            }).not.toThrow();

            expect(typeof cancel).toBe('function');

            // Cancellation function returns `true` when listener was un-subscribed.

            expect(function() {
                cancelResult = cancel();
            }).not.toThrow();

            expect(cancelResult).toEqual(true);

            // Cancellation function returns `false` if listener was already un-subscribed.

            expect(function() {
                cancelResult = cancel();
            }).not.toThrow();

            expect(cancelResult).toEqual(false);
        });
    });


    describe('#unsubscribe(listener)', () => {
        it('should return `true` when listener was un-subscribed', () => {
            listener = jest.fn();

            dispatcher.subscribe(listener);

            expect(function () {
                cancelResult = dispatcher.unsubscribe(listener);
            }).not.toThrow();

            expect(cancelResult).toEqual(true);
        });


        it('should return `false` if listener was already un-subscribed', () => {
            listener = jest.fn();

            dispatcher.subscribe(listener);
            dispatcher.unsubscribe(listener);

            expect(function () {
                cancelResult = dispatcher.unsubscribe(listener);
            }).not.toThrow();

            expect(cancelResult).toEqual(false);
        });


        it('should return `false` if listener was not subscribed', () => {
            listener = jest.fn();

            expect(function () {
                cancelResult = dispatcher.unsubscribe(listener);
            }).not.toThrow();

            expect(cancelResult).toEqual(false);
        });
    });


    describe('#dispatch(action)', () => {
        it('should trigger all listeners with specified action', () => {
            listener = jest.fn();

            dispatcher.subscribe(listener);

            expect(function () {
                dispatcher.dispatch(testAction);
            }).not.toThrow();

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(testAction);
        });
    });
});