import Event from '../../lib/Core/Event';
import EventEmitter, {IEventHandler} from '../../lib/Core/EventEmitter';


describe('Core.EventEmitter', () => {
    let emitter: EventEmitter = null;
    let listener: IEventHandler = null;
    let lastContext = null;
    let context = {
        TEST_CONTEXT: true
    };
    let testEvent: Event = new Event('test');


    beforeEach(() => {
        lastContext = null;

        expect(function() {
            emitter = new EventEmitter();
        }).not.toThrow();
    });


    describe('#constructor()', () => {
        it('should create new instance of EventEmitter class', () => {
            expect(emitter).toBeInstanceOf(EventEmitter);
        });
    });


    describe('#on(type, listener[, context])', () => {
        it('should attach event listener', () => {
            listener = jest.fn();

            // Add event listener.

            expect(function () {
                emitter.on(testEvent.type, listener);
            }).not.toThrow();

            expect(emitter.types).toEqual([testEvent.type]);

            // Emit event.

            expect(function () {
                emitter.emit(testEvent);
            }).not.toThrow();

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenLastCalledWith(testEvent);

            // Emit event again.

            expect(function () {
                emitter.emit(testEvent);
            }).not.toThrow();

            expect(listener).toHaveBeenCalledTimes(2);
            expect(listener).toHaveBeenLastCalledWith(testEvent);
        });


        it('should attach event listener with context', () => {
            listener = jest.fn(function () {
                lastContext = this;
            });

            expect(function () {
                emitter.on(testEvent.type, listener, context);
            }).not.toThrow();

            emitter.emit(testEvent);

            expect(lastContext).toEqual(context);
        });
    });


    describe('#once(type, listener[, context])', () => {
        it('should attach one-time event listener', () => {
            listener = jest.fn();

            expect(function () {
                emitter.once(testEvent.type, listener);
            }).not.toThrow();

            expect(emitter.types).toEqual([testEvent.type]);

            // Emit event.

            expect(function () {
                emitter.emit(testEvent);
            }).not.toThrow();

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenLastCalledWith(testEvent);

            // Emit event again.

            expect(function () {
                emitter.emit(testEvent);
            }).not.toThrow();

            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenLastCalledWith(testEvent);
        });


        it('should attach one-time event listener with context', () => {
            listener = jest.fn(function () {
                lastContext = this;
            });

            expect(function () {
                emitter.once(testEvent.type, listener, context);
            }).not.toThrow();

            emitter.emit(testEvent);

            expect(lastContext).toEqual(context);
        });
    });
});
