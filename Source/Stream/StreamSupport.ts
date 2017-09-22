import {ReceiverSupport} from '../Support/DataFlow/ReceiverSupport';


export abstract class StreamSupport<TIn, TOut> extends ReceiverSupport<StreamSupport<TOut, any>> {

    protected async accept(input: TIn): Promise<void> {
        let output: TOut = await this.transform(input);

        await this.publish(output);
    }


    protected abstract transform(input: TIn): Promise<TOut>;


    protected async publish(output: TOut): Promise<void> {
        const receivers = this.getAllReceivers();

        for (let target of receivers) {
            await target.accept(output);
        }
    }
}
