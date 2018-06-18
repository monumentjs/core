import {ReadStream} from 'fs';
import {Path} from '../../path/Path';
import {FileInputStream} from '../stream/FileInputStream';
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {EventArgs} from '@monument/core/main/events/EventArgs';
import {ListQueue} from '@monument/core/main/collections/ListQueue';
import {DeferredObject} from '@monument/core/main/async/DeferredObject';
import {MemorySize} from '@monument/core/main/MemorySize';
import {Event} from '@monument/core/main/events/Event';
import {InvalidStateException} from '@monument/core/main/exceptions/InvalidStateException';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {StreamException} from '@monument/core/main/stream/StreamException';


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
        this._stream.on('readable', this.handleReadable);
        this._stream.on('close', this.handleClose);
        this._stream.on('end', this.handleEnd);
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
    private handleClose() {
        if (this._closeCommand != null) {
            this._isClosing = false;
            this._isClosed = true;

            this._closeCommand.resolve();
            this._closeCommand = undefined;

            this._closed.trigger(this, EventArgs.EMPTY);
        }
    }


    @Delegate
    private handleEnd() {
        this._isEnded = true;

        while (!this._readCommands.isEmpty) {
            const deferred: DeferredObject<Buffer | undefined> = this._readCommands.pop();

            deferred.reject(new StreamException('Cannot read from stream: stream ended.'));
        }

        this._ended.trigger(this, EventArgs.EMPTY);
    }


    @Delegate
    private handleReadable() {
        while (!this._readCommands.isEmpty && this._stream.readable) {
            const deferred: DeferredObject<Buffer | undefined> = this._readCommands.pop();

            deferred.resolve(this._stream.read());
        }
    }
}
