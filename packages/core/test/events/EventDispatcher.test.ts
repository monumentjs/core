import {EventDispatcher, EventArgs} from '../..';

describe('EventDispatcher', function () {
    describe('subscribe()', function () {
        it('should return `true` if new handler added, `false` otherwise', function () {
            const event: EventDispatcher<EventArgs> = new EventDispatcher();
            const handler1 = jest.fn();
            const handler2 = jest.fn();
            expect(event.subscribe(handler1)).toBe(true);
            expect(event.subscribe(handler1)).toBe(false);
            expect(event.subscribe(handler2)).toBe(true);
            expect(event.subscribe(handler2)).toBe(false);
        });
    });

    describe('event handling', function () {
        it('event handler invoked with event args', function () {
            const mock = jest.fn();
            const target: object = {};
            const event: EventDispatcher<EventArgs> = new EventDispatcher();
            const args: EventArgs<object> = new EventArgs(target);

            event.subscribe(mock);

            expect(mock).toHaveBeenCalledTimes(0);

            event.trigger(args);

            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenNthCalledWith(1, args);
        });

        it('event handler not invoked after being unsubscribed', function () {
            const mock = jest.fn();
            const target: object = {};
            const event: EventDispatcher<EventArgs> = new EventDispatcher();
            const args1 = new EventArgs(target);
            const args2 = new EventArgs(target);

            event.subscribe(mock);

            event.trigger(args1);

            expect(event.unsubscribe(mock)).toBe(true);
            expect(event.unsubscribe(mock)).toBe(false);

            event.trigger(args2);

            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenNthCalledWith(1, args1);
        });

        it('event handlers detached when event is disposed', function () {
            const mock = jest.fn();
            const target: object = {};
            const event: EventDispatcher<EventArgs> = new EventDispatcher();
            const args1 = new EventArgs(target);
            const args2 = new EventArgs(target);

            event.subscribe(mock);

            event.trigger(args1);

            event.dispose();

            event.trigger(args2);

            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenNthCalledWith(1, args1);
        });
    });
});
