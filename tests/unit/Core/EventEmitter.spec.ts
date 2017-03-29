import Event from '../../../lib/Core/Events/Event';
import EventEmitter from '../../../lib/Core/Events/EventEmitter';
import {EventListener} from '../../../lib/Core/Events/types';
import ArgumentNullException from '../../../lib/Core/Exceptions/ArgumentNullException';


describe('EventEmitter', () => {
    let eventEmitter: EventEmitter = null;
    let listeners: EventListener[];
    let testEvents: Event[];
    
    
    beforeEach(() => {
        testEvents = [
            new Event('one'),
            new Event('two'),
            new Event('three')
        ];

        listeners = [
            jest.fn(),
            jest.fn(),
            jest.fn()
        ];

        eventEmitter = new EventEmitter();
    });
    
    
    describe('#constructor()', () => {
        it('creates new instance of EventEmitter class', () => {
            expect(eventEmitter).toBeInstanceOf(EventEmitter);
        });
    });
    
    
    describe('#addEventListener()', () => {
        it(`throws if 'eventType' argument is not defined`, () => {
            expect(() => {
                eventEmitter.addEventListener(null, listeners[0]);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'eventListener' argument is not defined`, () => {
            expect(() => {
                eventEmitter.addEventListener(testEvents[0].type, null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'removeAfterExecution' argument is not defined`, () => {
            expect(() => {
                eventEmitter.addEventListener(testEvents[0].type, listeners[0], null);
            }).toThrowError(ArgumentNullException);
        });

        it('attaches event listener that runs each time', () => {
            expect(eventEmitter.types.length).toEqual(0);
            
            eventEmitter.addEventListener(testEvents[0].type, listeners[0]);

            expect(eventEmitter.types.length).toEqual(1);
            expect(eventEmitter.types[0]).toEqual(testEvents[0].type);
        });

        it('makes possible to get types of all event listeners', () => {
            eventEmitter.addEventListener(testEvents[0].type, listeners[0]);
            eventEmitter.addEventListener(testEvents[1].type, listeners[1]);
            eventEmitter.addEventListener(testEvents[2].type, listeners[2]);
            eventEmitter.addEventListener(testEvents[1].type, listeners[1]);

            expect(eventEmitter.types.toArray()).toEqual([
                testEvents[0].type,
                testEvents[1].type,
                testEvents[2].type
            ]);
        });
    });
    
    
    describe('#removeEventListener()', () => {
        it(`throws if 'eventType' argument is not defined`, () => {
            expect(() => {
                eventEmitter.removeEventListener(null, listeners[0]);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'eventListener' argument is not defined`, () => {
            expect(() => {
                eventEmitter.removeEventListener(testEvents[0].type, null);
            }).toThrowError(ArgumentNullException);
        });

        it('removes event listener', () => {
            eventEmitter.addEventListener(testEvents[0].type, listeners[0]);

            expect(eventEmitter.types.length).toEqual(1);
            expect(eventEmitter.types[0]).toEqual(testEvents[0].type);

            eventEmitter.removeEventListener(testEvents[0].type, listeners[0]);

            expect(eventEmitter.types.length).toEqual(0);
        });

        it('does not throw if event listener is not attached', () => {
            expect(() => {
                eventEmitter.removeEventListener(testEvents[0].type, listeners[0]);
            }).not.toThrow();
        });
    });
    
    
    describe('#dispatchEvent()', () => {
        it(`throws if 'event' argument is not defined`, () => {
            expect(() => {
                eventEmitter.dispatchEvent(undefined);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                eventEmitter.dispatchEvent(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`dispatches specified event to all listeners`, () => {
            eventEmitter.addEventListener(testEvents[0].type, listeners[0]);
            
            eventEmitter.dispatchEvent(testEvents[0]);

            expect(listeners[0]).toHaveBeenCalledTimes(1);
            expect(listeners[0]).toHaveBeenLastCalledWith(testEvents[0]);

            expect(eventEmitter.types.length).toBe(1);
            expect(eventEmitter.types[0]).toBe(testEvents[0].type);
        });

        it(`removes many one-time event listeners for same event type`, () => {
            eventEmitter.addEventListener(testEvents[0].type, listeners[0], true);
            eventEmitter.addEventListener(testEvents[0].type, listeners[0], true);

            eventEmitter.dispatchEvent(testEvents[0]);

            expect(listeners[0]).toHaveBeenCalledTimes(2);
            expect(listeners[0]).toHaveBeenLastCalledWith(testEvents[0]);

            expect(eventEmitter.types.length).toBe(0);
        });

        it(`removes many one-time event listeners for different event type`, () => {
            eventEmitter.addEventListener(testEvents[0].type, listeners[0], true);
            eventEmitter.addEventListener(testEvents[1].type, listeners[1], true);

            eventEmitter.dispatchEvent(testEvents[0]);

            expect(listeners[0]).toHaveBeenCalledTimes(1);
            expect(listeners[0]).toHaveBeenLastCalledWith(testEvents[0]);
            expect(listeners[1]).toHaveBeenCalledTimes(0);

            expect(eventEmitter.types.length).toBe(1);
            expect(eventEmitter.types[0]).toBe(testEvents[1].type);

            eventEmitter.dispatchEvent(testEvents[1]);

            expect(listeners[0]).toHaveBeenCalledTimes(1);
            expect(listeners[1]).toHaveBeenCalledTimes(1);
            expect(listeners[1]).toHaveBeenLastCalledWith(testEvents[1]);

            expect(eventEmitter.types.length).toBe(0);
        });

        it(`breaks execution of event listeners when event cancelled`, () => {
            let customListeners: EventListener[] = [
                jest.fn((event: Event) => {
                    event.cancel();
                }),
                jest.fn(),
                jest.fn()
            ];

            customListeners.forEach((customListener: EventListener) => {
                eventEmitter.addEventListener(testEvents[0].type, customListener);
            });

            eventEmitter.dispatchEvent(testEvents[0]);

            expect(customListeners[0]).toHaveBeenCalledTimes(1);
            expect(customListeners[1]).toHaveBeenCalledTimes(0);
            expect(customListeners[2]).toHaveBeenCalledTimes(0);
        });
    });


    describe(`#removeEventListeners()`, () => {
        it(`throws if 'eventType' argument is not defined`, () => {
            expect(() => {
                eventEmitter.removeEventListeners(null);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                eventEmitter.removeEventListeners(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`does not throw if instance haven't attached event listeners of specified type of event`, () => {
            expect(() => {
                eventEmitter.removeEventListeners(testEvents[0].type);
            }).not.toThrow();
        });

        it(`removes all event listeners of specified event type`, () => {
            testEvents.forEach((testEvent: Event, index: number) => {
                eventEmitter.addEventListener(testEvent.type, listeners[index]);
            });

            expect(eventEmitter.types.length).toBe(3);

            testEvents.forEach((testEvent: Event, index: number) => {
                eventEmitter.removeEventListeners(testEvent.type);

                expect(eventEmitter.types.length).toBe(testEvents.length - index - 1);
            });

            expect(eventEmitter.types.length).toBe(0);
        });
    });


    describe(`#removeAllEventListeners()`, () => {
        it(`removes all attached event listeners`, () => {
            testEvents.forEach((testEvent: Event, index: number) => {
                eventEmitter.addEventListener(testEvent.type, listeners[index]);
            });

            expect(eventEmitter.types.length).toBe(3);

            eventEmitter.removeAllEventListeners();

            expect(eventEmitter.types.length).toBe(0);

            testEvents.forEach((testEvent: Event) => {
                eventEmitter.dispatchEvent(testEvent);
            });

            listeners.forEach((listener: EventListener) => {
                expect(listener).toHaveBeenCalledTimes(0);
            });
        });
    });
});
