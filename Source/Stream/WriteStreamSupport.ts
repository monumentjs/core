import {StreamSupport} from './StreamSupport';


export abstract class WriteStreamSupport<TIn, TOut = TIn> extends StreamSupport<TIn, TOut> {
    public write(input: TIn): Promise<void> {
        return this.accept(input);
    }


    public abstract close(): Promise<void>;


    protected abstract _write(output: TOut): Promise<void>;


    protected async publish(output: TOut): Promise<void> {
        await this._write(output);
        await super.publish(output);
    }
}
