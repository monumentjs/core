import {Event} from '../../../Source/Events/Event';
import {IDisposable} from '../../../Source/Core/Abstraction/IDisposable';
import {EventHandlerFunction} from '../../../Source/Events/types';
import {EventArgs} from '../../../Source/Events/EventArgs';


describe(`Event`, () => {
    let target: object;
    let event: Event;


    beforeEach(() => {
        target = {};
        event = new Event(target);
    });
    

    test(`events subscription`, () => {
        let handler: EventHandlerFunction = jest.fn();
        let subscription: IDisposable = event.subscribe(handler);
        let args1: EventArgs = new EventArgs();
        let args2: EventArgs = new EventArgs();
        let args3: EventArgs = new EventArgs();

        expect(subscription).not.toBeNull();
        expect(handler).toHaveBeenCalledTimes(0);

        event.dispatch(args1);

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(target, args1);

        event.dispatch(args2);

        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(target, args2);

        subscription.dispose();

        event.dispatch(args3);

        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(target, args2);
    });
});
