import { Publisher } from '../../../../pub-sub/main/Publisher';
import { Disposable } from '../../../main/Disposable';
import { Subscriber } from '../../../../pub-sub/main/Subscriber';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { BeforeEach } from '@monument/test-drive/Decorators/BeforeEach';
import { Case } from '../../../../test-drive/Decorators/Case';


@Test()
export class DispatcherSpec {
    protected dispatcher: Publisher<object>;
    protected testAction: object = {
        type: 'test'
    };


    @BeforeEach()
    public setUpTest() {
        this.dispatcher = new Publisher();
    }


    @Case()
    public 'subscribe() returns subscription token'() {
        let subscriber: Subscriber<object> = jest.fn();
        let subscription: Disposable = this.dispatcher.subscribe(subscriber);

        expect(subscription).not.toEqual(null);
    }


    @Case()
    public 'dispatch() publishes value to all subscribers'() {
        let subscriber1: Subscriber<object> = jest.fn();
        let subscriber2: Subscriber<object> = jest.fn();

        let subscription1 = this.dispatcher.subscribe(subscriber1);
        let subscription2 = this.dispatcher.subscribe(subscriber2);

        this.dispatcher.publish(this.testAction);

        expect(subscriber1).toHaveBeenCalledTimes(1);
        expect(subscriber1).toHaveBeenCalledWith(this.testAction);

        expect(subscriber2).toHaveBeenCalledTimes(1);
        expect(subscriber2).toHaveBeenCalledWith(this.testAction);

        subscription1.dispose();

        this.dispatcher.publish(this.testAction);

        expect(subscriber1).toHaveBeenCalledTimes(1);
        expect(subscriber1).toHaveBeenCalledWith(this.testAction);

        expect(subscriber2).toHaveBeenCalledTimes(2);
        expect(subscriber2).toHaveBeenCalledWith(this.testAction);

        subscription2.dispose();

        this.dispatcher.publish(this.testAction);

        expect(subscriber1).toHaveBeenCalledTimes(1);
        expect(subscriber1).toHaveBeenCalledWith(this.testAction);

        expect(subscriber2).toHaveBeenCalledTimes(2);
        expect(subscriber2).toHaveBeenCalledWith(this.testAction);
    }
}
