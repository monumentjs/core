import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {EventHandler} from '@monument/core/main/events/EventHandler';
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {EventArgs} from '@monument/core/main/events/EventArgs';


export class ConfigurableEventTest {

    @Test
    public 'event handler invoked with event args'(assert: Assert) {
        const mock: FunctionMock<EventHandler<object, EventArgs>> = new FunctionMock();
        const target: object = {};
        const event: ConfigurableEvent<object, EventArgs> = new ConfigurableEvent();
        const args = new EventArgs();

        assert.equals(mock.calls.length, 0);

        assert.true(event.subscribe(mock.value));

        event.trigger(target, args);

        assert.equals(mock.calls.length, 1);
        assert.true(mock.testCallArguments(0, [target, args]));
    }


    @Test
    public 'event handler not invoked after being unsubscribed'(assert: Assert) {
        const mock: FunctionMock<EventHandler<object, EventArgs>> = new FunctionMock();
        const target: object = {};
        const event: ConfigurableEvent<object, EventArgs> = new ConfigurableEvent();
        const args1 = new EventArgs();
        const args2 = new EventArgs();

        assert.true(event.subscribe(mock.value));

        event.trigger(target, args1);

        assert.true(event.unsubscribe(mock.value));

        event.trigger(target, args2);

        assert.equals(mock.calls.length, 1);
        assert.true(mock.testCallArguments(0, [target, args1]));
    }


    @Test
    public 'event handlers detached when event is disposed'(assert: Assert) {
        const mock: FunctionMock<EventHandler<object, EventArgs>> = new FunctionMock();
        const target: object = {};
        const event: ConfigurableEvent<object, EventArgs> = new ConfigurableEvent();
        const args1 = new EventArgs();
        const args2 = new EventArgs();

        assert.true(event.subscribe(mock.value));

        event.trigger(target, args1);

        event.dispose();

        event.trigger(target, args2);

        assert.equals(mock.calls.length, 1);
        assert.true(mock.testCallArguments(0, [target, args1]));
    }
}
