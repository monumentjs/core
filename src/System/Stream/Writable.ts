import {Chainable} from './Chainable';


export abstract class Writable<TIn, TOut = TIn> extends Chainable<TIn, TOut> {
    public write(input: TIn): Promise<void> {
        return this.push(input);
    }


    public abstract close(): Promise<void>;


    public async emit(output: TOut): Promise<void> {
        await this._write(output);
        await super.emit(output);
    }


    protected abstract _write(output: TOut): Promise<void>;
}
