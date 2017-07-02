import {List} from '../../Core/Collections/List';
import {Assert} from '../../Core/Assertion/Assert';


export abstract class Chainable<TIn, TOut> {
    private _receivers: List<Chainable<TOut, any>> = new List<Chainable<TOut, any>>();


    public addReceiver<T extends Chainable<TOut, any>>(receiver: T): void {
        Assert.argument('receiver', receiver).notNull();

        if (!this._receivers.contains(receiver)) {
            this._receivers.add(receiver);
        }
    }


    public removeReceiver<T extends Chainable<TOut, any>>(receiver: T): void {
        Assert.argument('receiver', receiver).notNull();

        this._receivers.remove(receiver);
    }


    public hasReceiver<T extends Chainable<TOut, any>>(receiver: T): boolean {
        Assert.argument('receiver', receiver).notNull();

        return this._receivers.contains(receiver);
    }


    public removeAllReceivers(): void {
        this._receivers.clear();
    }


    protected async push(input: TIn): Promise<void> {
        let output: TOut = await this.transform(input);

        await this.emit(output);
    }


    protected abstract transform(input: TIn): Promise<TOut>;


    protected async emit(output: TOut): Promise<void> {
        for (let target of this._receivers) {
            await target.push(output);
        }
    }
}
