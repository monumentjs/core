import {ReadStream} from 'fs';
import {InvalidStateException} from '@monument/core/main/exceptions/InvalidStateException';
import {MemorySize} from '@monument/core/main/MemorySize';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {ListQueue} from '@monument/collections/main/ListQueue';
import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {StreamException} from '@monument/stream/main/StreamException';
import {Path} from '../../path/Path';
import {FileInputStream} from '../stream/FileInputStream';


export class LocalFileInputStream implements FileInputStream {
    private readonly _closed: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent();
    private readonly _ended: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent();
    private readonly _readCommands: ListQueue<DeferredObject<Buffer | undefined>> = new ListQueue();
    private readonly _stream: ReadStream;
    private readonly _path: Path;
    private _closeCommand: DeferredObject<void> | undefined;
    private _isClosed: boolean = false;
    private _isClosing: boolean = false;
    private _isEnded: boolean = false;


    public get path(): Path {
        return this._path;
    }


    public get bytesRead(): MemorySize {
        return new MemorySize(this._stream.bytesRead);
    }


    public get closed(): Event<this, EventArgs> {
        return this._closed;
    }


    public get ended(): Event<this, EventArgs> {
        return this._ended;
    }


    public get isClosed(): boolean {
        return this._isClosed;
    }


    public get isEnded(): boolean {
        return this._isEnded;
    }


    public constructor(path: Path, stream: ReadStream) {
        this._path = path;
        this._stream = stream;
        this._stream.on('readable', this.onReadable);
        this._stream.on('close', this.onClose);
        this._stream.on('end', this.onEnd);
    }


    public [Symbol.asyncIterator](): AsyncIterator<Buffer> {
        return {
            next: async () => {
                const buffer: Buffer | undefined = await this.read();

                if (buffer == null) {
                    return {
                        value: undefined as any,
                        done: true
                    };
                } else {
                    return {
                        value: buffer,
                        done: false
                    };
                }
            }
        };
    }


    public async close(): Promise<void> {
        if (this._isClosed === false && this._isClosing === false) {
            this._isClosing = true;

            this._closeCommand = new DeferredObject();
            this._stream.close();

            return this._closeCommand.promise;
        }

        throw new InvalidStateException(`Cannot close stream because it's already closed or closing in process.`);
    }


    public async read(): Promise<Buffer | undefined> {
        const deferred: DeferredObject<Buffer | undefined> = new DeferredObject();

        if (this._stream.readable) {
            deferred.resolve(this._stream.read());
        } else {
            this._readCommands.enqueue(deferred);
        }

        return deferred.promise;
    }


    @Delegate
    private onClose() {
        if (this._closeCommand != null) {
            this._isClosing = false;
            this._isClosed = true;

            this._closeCommand.resolve();
            this._closeCommand = undefined;

            this._closed.trigger(this, new EventArgs());
        }
    }


    @Delegate
    private onEnd() {
        this._isEnded = true;

        while (!this._readCommands.isEmpty) {
            const deferred: DeferredObject<Buffer | undefined> = this._readCommands.pop();

            deferred.reject(new StreamException('Cannot read from stream: stream ended.'));
        }

        this._ended.trigger(this, new EventArgs());
    }


    @Delegate
    private onReadable() {
        while (!this._readCommands.isEmpty && this._stream.readable) {
            const deferred: DeferredObject<Buffer | undefined> = this._readCommands.pop();

            deferred.resolve(this._stream.read());
        }
    }
}
