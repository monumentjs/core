import {InputStream} from '@monument/core/main/stream/InputStream';
import {EventArgs} from '@monument/core/main/events/EventArgs';
import {Event} from '@monument/core/main/events/Event';
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {ListQueue} from '@monument/core/main/collection/mutable/ListQueue';
import {EndOfStreamException} from '@monument/core/main/stream/EndOfStreamException';
import {ReadRequest} from './support/ReadRequest';
import {Readable} from 'stream';
import {InvalidStateException} from '@monument/core/main/exceptions/InvalidStateException';
import {StreamException} from '@monument/core/main/stream/StreamException';


export class BinaryInputStream implements InputStream<Buffer> {
    private readonly _readRequests: ListQueue<ReadRequest<Buffer | undefined>> = new ListQueue();
    private readonly _ended: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent();
    private _isEnded: boolean = false;
    protected readonly _stream: Readable;


    public get isEnded(): boolean {
        return this._isEnded;
    }


    public get ended(): Event<this, EventArgs> {
        return this._ended;
    }


    public constructor(stream: Readable) {
        this._stream = stream;
        this._stream.on('end', this.handleEnd);
        this._stream.on('error', this.handleError);
        this._stream.on('readable', this.handleReadable);
    }


    public [Symbol.asyncIterator](): AsyncIterator<Buffer> {
        return {
            next: async () => {
                const chunk = await this.read();

                if (chunk == null) {
                    return {
                        done: true,
                        value: undefined as any
                    };
                } else {
                    return {
                        done: false,
                        value: chunk
                    };
                }
            }
        };
    }


    public read(size?: number): Promise<Buffer | undefined> {
        const request: ReadRequest<Buffer | undefined> = new ReadRequest(size);
        const chunk: string | Buffer | undefined = this._stream.read(request.size);

        if (chunk == null) {
            this._readRequests.enqueue(request);
        } else {
            this.respondWithChunk(request, chunk);
        }

        return request.promise;
    }


    @Delegate
    private handleEnd(): void {
        this._isEnded = true;

        for (const request of this._readRequests) {
            request.reject(new EndOfStreamException('Cannot read from stream: no more data.'));
        }

        this._ended.trigger(this, new EventArgs());
    }


    @Delegate
    private handleError(error: Error): void {
        for (const request of this._readRequests) {
            request.reject(new StreamException('Internal stream error.', error));
        }
    }


    @Delegate
    private handleReadable(): void {
        while (!this._readRequests.isEmpty) {
            const request: ReadRequest<Buffer | undefined> = this._readRequests.peek();
            const chunk: string | Buffer | undefined = this._stream.read(request.size);

            if (chunk == null) {
                // Wait until new portion of data will be loaded or stream ended
                return;
            }

            this._readRequests.pop();

            this.respondWithChunk(request, chunk);
        }
    }


    private respondWithChunk(request: ReadRequest<Buffer | undefined>, chunk: string | Buffer): void {
        if (typeof chunk === 'string') {
            throw new InvalidStateException('Source stream in text mode.');
        }

        request.resolve(chunk);
    }
}
