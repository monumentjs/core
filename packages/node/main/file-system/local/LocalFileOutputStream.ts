import {WriteStream} from 'fs';
import {Path} from '../../path/Path';
import {FileOutputStream} from '../stream/FileOutputStream';
import ErrnoException = NodeJS.ErrnoException;
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {EventArgs} from '@monument/core/main/events/EventArgs';
import {ListQueue} from 'core/main/collection/mutable/ListQueue';
import {DeferredObject} from '@monument/core/main/async/DeferredObject';
import {MemorySize} from '@monument/core/main/MemorySize';
import {Event} from '@monument/core/main/events/Event';
import {Delegate} from '@monument/core/main/decorators/Delegate';


export class LocalFileOutputStream implements FileOutputStream {
    private readonly _closed: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent();
    private readonly _path: Path;
    private readonly _stream: WriteStream;
    private readonly _closeCommands: ListQueue<DeferredObject<void>> = new ListQueue();
    private _isClosed: boolean = false;


    public get path(): Path {
        return this._path;
    }


    public get bytesWritten(): MemorySize {
        return new MemorySize(this._stream.bytesWritten);
    }


    public get closed(): Event<this, EventArgs> {
        return this._closed;
    }


    public get isClosed(): boolean {
        return this._isClosed;
    }


    public constructor(path: Path, stream: WriteStream) {
        this._path = path;
        this._stream = stream;
        this._stream.on('close', this.handleClose);
    }


    public async close(): Promise<void> {
        if (this._isClosed === false) {
            const deferred: DeferredObject<void> = new DeferredObject();

            this._closeCommands.enqueue(deferred);
            this._stream.close();

            return deferred.promise;
        }
    }


    public write(chunk: Buffer): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._stream.write(chunk, (error: ErrnoException) => {
            if (error == null) {
                deferred.resolve();
            } else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }


    @Delegate
    private handleClose() {
        this._isClosed = true;

        for (const command of this._closeCommands) {
            command.resolve();
        }

        this._closed.trigger(this, new EventArgs());
    }
}
