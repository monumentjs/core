import {Chainable} from './Chainable';
import {InvalidOperationException} from '../../Core/Exceptions/InvalidOperationException';


export abstract class Readable<TIn, TOut = TIn> extends Chainable<TIn, TOut> {
    private _isPaused: boolean = true;
    private _isEnded: boolean = false;


    public get isPaused(): boolean {
        return this._isPaused;
    }


    public get isEnded(): boolean {
        return this._isEnded;
    }


    public async read(): Promise<TOut> {
        let input: TIn = await this._read();
        let output: TOut;

        if (input == null) {
            this.setEnded(true);
            return null;
        }

        output = await this.transform(input);

        await this.emit(output);

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


    protected abstract _read(): Promise<TIn>;


    protected async push(): Promise<void> {
        throw new InvalidOperationException(`Readable streams cannot receive chunks.`);
    }


    protected setEnded(value: boolean): void {
        this._isEnded = value;
    }


    protected setPaused(value: boolean): void {
        this._isPaused = value;
    }
}
