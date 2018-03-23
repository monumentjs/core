import {Disposable} from '@monument/core/main/Disposable';
import {Collection} from '@monument/collections-core/main/Collection';
import {ListSet} from '@monument/collections/main/ListSet';
import {InputStream} from './InputStream';
import {OutputStream} from './OutputStream';


export abstract class AbstractChannel<TIn, TOut> implements Disposable {
    private _isDisposed: boolean = false;
    private _isPaused: boolean = true;

    protected readonly outputs: Collection<OutputStream<TOut>> = new ListSet();
    protected readonly input: InputStream<TIn>;


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public get isPaused(): boolean {
        return this._isPaused;
    }


    public get outputsCount(): number {
        return this.outputs.length;
    }


    public constructor(input: InputStream<TIn>) {
        this.input = input;
    }


    public async resume(): Promise<void> {
        this._isPaused = false;

        let chunk: TIn | undefined;

        do {
            chunk = await this.input.read();

            if (chunk != null) {
                await this.broadcast(chunk);
            }

        } while (chunk != null && !this.isPaused && !this.input.isEnded && !this.input.isClosed);
    }


    public async pause(): Promise<void> {
        this._isPaused = true;
    }


    public addOutput(output: OutputStream<TOut>): boolean {
        return this.outputs.add(output);
    }


    public addOutputs(outputs: Iterable<OutputStream<TOut>>): boolean {
        return this.outputs.addAll(outputs);
    }


    public removeOutput(output: OutputStream<TOut>): boolean {
        return this.outputs.remove(output);
    }


    public removeOutputs(outputs: Iterable<OutputStream<TOut>>): boolean {
        return this.outputs.removeAll(outputs);
    }


    public dispose(): void {
        this.outputs.clear();
    }


    protected async broadcast(chunk: TIn): Promise<void> {
        let transformedChunk: TOut = await this.transform(chunk);

        for (let output of this.outputs) {
            if (!output.isClosed) {
                await output.write(transformedChunk);
            }
        }
    }


    protected abstract transform(chunk: TIn): Promise<TOut>;
}
