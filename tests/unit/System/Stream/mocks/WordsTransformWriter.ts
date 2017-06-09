import {Stream} from '../../../../../src/System/Stream/Stream';
import {StreamWriter} from '../../../../../src/System/Stream/StreamWriter';


export class WordsTransformWriter extends StreamWriter<Stream<string>, string> {
    private _transformFunction: (input: string) => string;


    public constructor(targetStream: Stream<string>, transformFunction: (input: string) => string) {
        super(targetStream);

        this._transformFunction = transformFunction;
    }


    protected async onWrite(chunk: string): Promise<number> {
        await this.openIfNotReady();

        return this.targetStream.write(this._transformFunction(chunk));
    }


    private async openIfNotReady(): Promise<void> {
        if (!this.targetStream.isReady) {
            await this.targetStream.open();
        }
    }
}
