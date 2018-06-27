import {Channel} from '../Channel';
import {ProcessMessage} from '../ProcessMessage';
import {ProcessAction} from './ProcessAction';
import {ProcessMessageReceivedEventArgs} from '../ProcessMessageReceivedEventArgs';
import {Class} from '@monument/core/main/reflection/Class';


export class ProcessController<TAction extends ProcessAction<any>> {
    private readonly _channel: Channel<TAction>;


    public constructor(channel: Channel<TAction>) {
        this._channel = channel;
        this._channel.messageReceived.subscribe(this.handleMessageReceived);
    }


    protected async sendMessage(message: ProcessMessage<TAction>) {
        await this._channel.sendMessage(message);
    }


    private async handleMessageReceived(target: Channel<TAction>, args: ProcessMessageReceivedEventArgs<TAction>) {
        const actionType: string = args.message.payload.actionType;
        const klass: Class<object> = Class.of(this.constructor);
        const method = klass.getMethod(actionType);

        await method.invoke(this, [args.message.payload]);
    }
}
