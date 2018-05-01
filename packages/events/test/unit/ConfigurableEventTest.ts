import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {MockFactory} from '@monument/test-drive/main/mock/MockFactory';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {ConfigurableEvent} from '../../main/ConfigurableEvent';
import {EventHandler} from '../../main/EventHandler';


export class ConfigurableEventTest {

    @Test
    public 'event handler invoked with event args'(assert: Assert, mockFactory: MockFactory) {
        const mock: FunctionMock<EventHandler<object, number>> = mockFactory.function();
        const target: object = {};
        const event: ConfigurableEvent<object, number> = new ConfigurableEvent(target);

        assert.equals(mock.calls.length, 0);

        assert.true(event.subscribe(mock.value));

        event.dispatch(123);

        assert.equals(mock.calls.length, 1);
        assert.true(mock.testCallArguments(0, [target, 123]));
    }


    @Test
    public 'event handler not invoked after being unsubscribed'(assert: Assert, mockFactory: MockFactory) {
        const mock: FunctionMock<EventHandler<object, number>> = mockFactory.function();
        const target: object = {};
        const event: ConfigurableEvent<object, number> = new ConfigurableEvent(target);

        assert.true(event.subscribe(mock.value));

        event.dispatch(123);

        assert.true(event.unsubscribe(mock.value));

        event.dispatch(456);

        assert.equals(mock.calls.length, 1);
        assert.true(mock.testCallArguments(0, [target, 123]));
    }


    @Test
    public 'event handlers detached when event is disposed'(assert: Assert, mockFactory: MockFactory) {
        const mock: FunctionMock<EventHandler<object, number>> = mockFactory.function();
        const target: object = {};
        const event: ConfigurableEvent<object, number> = new ConfigurableEvent(target);

        assert.true(event.subscribe(mock.value));

        event.dispatch(123);

        event.dispose();

        event.dispatch(456);

        assert.equals(mock.calls.length, 1);
        assert.true(mock.testCallArguments(0, [target, 123]));
    }
}
