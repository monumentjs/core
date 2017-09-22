import {StreamSupport} from './StreamSupport';
import {InvalidOperationException} from '../Exceptions/InvalidOperationException';


export abstract class ReadStreamSupport<TIn, TOut = TIn> extends StreamSupport<TIn, TOut> {
    private _isPaused: boolean = true;
    private _isEnded: boolean = false;


    public get isPaused(): boolean {
        return this._isPaused;
    }


    public get isEnded(): boolean {
        return this._isEnded;
    }


    public async read(): Promise<TOut | undefined> {
        let input: TIn | undefined = await this._read();
        let output: TOut;

        if (input == null) {
            this.setEnded(true);

            return;
        }

        output = await this.transform(input);

        await this.publish(output);

        return output;
    }


    public async resume(): Promise<void> {
        if (this.isEnded) {
            this.setPaused(true);

            return;
        }

        this.setPaused(false);

        while (!this.isPaused && !this.isEnded) {
            await this.read();
        }
    }


    public async pause(): Promise<void> {
        this.setPaused(true);
    }


    protected abstract _read(): Promise<TIn | undefined>;


    protected async accept(): Promise<void> {
        throw new InvalidOperationException(`Readable streams cannot receive chunks.`);
    }


    protected setEnded(value: boolean): void {
        this._isEnded = value;
    }


    protected setPaused(value: boolean): void {
        this._isPaused = value;
    }
}
