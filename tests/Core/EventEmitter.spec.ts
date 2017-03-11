import Event from '../../lib/Core/Events/Event';
import EventEmitter from '../../lib/Core/Events/EventEmitter';
import {EventListener} from '../../lib/Core/Events/types';


describe('EventEmitter', () => {
    let eventEmitter: EventEmitter = null;
    let listener: EventListener = null;
    let testEvent: Event = new Event('test');
    
    
    beforeEach(() => {
        listener = jest.fn();
        
        expect(function () {
            eventEmitter = new EventEmitter();
        }).not.toThrow();
    });
    
    
    describe('#constructor()', () => {
        it('creates new instance of EventEmitter class', () => {
            expect(eventEmitter).toBeInstanceOf(EventEmitter);
        });
    });
    
    
    describe('#addListener()', () => {
        it('attaches event listener', () => {
            expect(eventEmitter.types.length).toEqual(0);
            
            expect(function () {
                eventEmitter.addEventListener(testEvent.type, listener);
            }).not.toThrow();
            
            expect(eventEmitter.types.length).toEqual(1);
            expect(eventEmitter.types[0]).toEqual(testEvent.type);
        });
    });
    
    
    describe('#removeListener()', () => {
        it('attaches event listener', () => {
            expect(eventEmitter.types.length).toEqual(0);
            
            expect(function () {
                eventEmitter.addEventListener(testEvent.type, listener);
            }).not.toThrow();
            
            expect(eventEmitter.types.length).toEqual(1);
            expect(eventEmitter.types[0]).toEqual(testEvent.type);
        });
    });
    
    
    describe('#dispatch()', () => {
        it(`dispatches specified event to all listeners`, () => {
            eventEmitter.addEventListener(testEvent.type, listener);
            
            expect(function () {
                eventEmitter.dispatchEvent(testEvent);
            }).not.toThrow();
            
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenLastCalledWith(testEvent);
        });
    
    
        it(`ignores duplicated listeners for same type of event`, () => {
            for (let i = 0; i < 10; i++) {
                eventEmitter.addEventListener(testEvent.type, listener);
            }
            
            eventEmitter.dispatchEvent(testEvent);
        
            expect(listener).toHaveBeenCalledTimes(1);
        });
    });
});
