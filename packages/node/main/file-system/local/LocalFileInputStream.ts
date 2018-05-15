import {ReadStream} from 'fs';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {ListQueue} from '@monument/collections/main/ListQueue';
import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {Path} from '../../path/Path';
import {FileInputStream} from '../stream/FileInputStream';
import {FileSize} from '../FileSize';
import {StreamException} from '@monument/stream/main/StreamException';


export class LocalFileInputStream implements FileInputStream {
    private readonly _closed: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent(this);
    private readonly _ended: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent(this);
    private readonly _readCommands: ListQueue<DeferredObject<Buffer | undefined>> = new ListQueue();
    private readonly _closeCommands: ListQueue<DeferredObject<void>> = new ListQueue();
    private readonly _stream: ReadStream;
    private readonly _path: Path;
    private _isClosed: boolean = false;
    private _isEnded: boolean = false;


    public get path(): Path {
        return this._path;
    }


    public get bytesRead(): FileSize {
        return new FileSize(this._stream.bytesRead);
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
        if (this.isClosed) {
            return;
        }

        const deferred: DeferredObject<void> = new DeferredObject();

        this._closeCommands.enqueue(deferred);
        this._stream.close();

        return deferred.promise;
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
        if (this._isClosed === false) {
            this._isClosed = true;

            for (const command of this._closeCommands) {
                command.resolve();
            }
        }
    }


    @Delegate
    private onEnd() {
        this._isEnded = true;

        while (!this._readCommands.isEmpty) {
            const deferred: DeferredObject<Buffer | undefined> = this._readCommands.pop();

            deferred.reject(new StreamException('Stream ended.'));
        }
    }


    @Delegate
    private onReadable() {
        while (!this._readCommands.isEmpty && this._stream.readable) {
            const deferred: DeferredObject<Buffer | undefined> = this._readCommands.pop();

            deferred.resolve(this._stream.read());
        }
    }
}
