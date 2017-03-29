import {Stream} from '../../../../../lib/System/Stream/Stream';
import {AsyncResult} from '../../../../../lib/Core/types';


export default class TextTransformStream extends Stream<string> {
    public static toLowerCase(): TextTransformStream {
        return new TextTransformStream((input: string): string => {
            return input.toLowerCase();
        });
    }


    public static toUpperCase(): TextTransformStream {
        return new TextTransformStream((input: string): string => {
            return input.toUpperCase();
        });
    }


    protected _bufferSize: number = 10;


    private _sequence: string = '';
    private _transformFunction: (input: string) => string;


    public get length(): number {
        return this._sequence.length;
    }


    protected constructor(transformFunction: (input: string) => string) {
        super();
        this._transformFunction = transformFunction;
    }


    protected async onOpen(): AsyncResult<void> {
        // Placeholder
    }


    protected async onClose(): AsyncResult<void> {
        this._sequence = '';
    }


    protected async onSeek(position: number): AsyncResult<number> {
        return position;
    }


    protected async onPause(): AsyncResult<void> {
        // No implementation
    }


    protected async onResume(): AsyncResult<void> {
        // No implementation
    }


    protected async onRead(size: number): AsyncResult<string> {
        return this._sequence.substr(this.position, size);
    }


    protected async onWrite(dataChunk: string): AsyncResult<number> {
        let sliceBefore: string = this._sequence.substring(0, this.position);
        let sliceAfter: string = this._sequence.substring(this.position + dataChunk.length);

        this._sequence = sliceBefore + dataChunk + sliceAfter;

        return dataChunk.length;
    }


    protected async onFlush(): AsyncResult<void> {
        // No implementation
    }


    protected async onDispose(): AsyncResult<void> {
        // No implementation
    }
}
