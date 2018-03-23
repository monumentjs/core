import {EventDispatcher} from '../../../Events/EventDispatcher';
import {Disposable} from '../../../main/Disposable';
import {EventArgs} from '../../../Events/EventArgs';
import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {BeforeEach} from '@monument/test-drive/Decorators/BeforeEach';
import {Case} from '../../../../test-drive/Decorators/Case';


@Test()
export class EventDispatcherSpec {
    protected target: object;
    protected dispatcher: EventDispatcher<object, EventArgs>;


    @BeforeEach()
    public setUpTest() {
        this.target = {};
        this.dispatcher = new EventDispatcher(this.target);
    }


    @Case()
    public 'subscribe() creates event subscription'() {
        let handler = jest.fn();
        let subscription: Disposable = this.dispatcher.subscribe(handler);

        expect(subscription).not.toBeNull();
        expect(typeof subscription.dispose).toBe('function');
    }


    @Case()
    public 'dispatch() invokes handler function with given event arguments'() {
        let handler = jest.fn();
        let args1: EventArgs = new EventArgs();
        let args2: EventArgs = new EventArgs();

        this.dispatcher.subscribe(handler);

        expect(handler).toHaveBeenCalledTimes(0);

        this.dispatcher.dispatch(args1);

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(this.target, args1);

        this.dispatcher.dispatch(args2);

        expect(handler).toHaveBeenCalledTimes(2);
        expect(handler).toHaveBeenLastCalledWith(this.target, args2);
    }


    @Case()
    public 'dispatch() does not invokes handler function after subscription was disposed'() {
        let handler = jest.fn();
        let subscription: Disposable = this.dispatcher.subscribe(handler);
        let args1: EventArgs = new EventArgs();
        let args2: EventArgs = new EventArgs();

        expect(handler).toHaveBeenCalledTimes(0);

        this.dispatcher.dispatch(args1);

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(this.target, args1);

        subscription.dispose();

        this.dispatcher.dispatch(args2);

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenLastCalledWith(this.target, args1);
    }
}
