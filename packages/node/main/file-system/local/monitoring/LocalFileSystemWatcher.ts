import {URL} from 'url';
import {FSWatcher, watch} from 'fs';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {InvalidStateException} from '@monument/core/main/exceptions/InvalidStateException';
import {Path} from '../../../path/Path';
import {FileSystemWatcher} from '../../monitoring/FileSystemWatcher';
import {FileSystemWatcherState} from '../../monitoring/FileSystemWatcherState';


enum ChangeType {
    RENAME = 'rename',
    CHANGE = 'change'
}


export class LocalFileSystemWatcher implements FileSystemWatcher {
    private _watcher: FSWatcher | undefined;
    private _state: FileSystemWatcherState = FileSystemWatcherState.PENDING;
    private readonly _path: Path;
    private readonly _persistent: boolean;
    private readonly _recursive: boolean;


    public get path(): Path {
        return this._path;
    }


    public get state(): FileSystemWatcherState {
        return this._state;
    }


    public get isPending(): boolean {
        return this._state === FileSystemWatcherState.PENDING;
    }


    public get isActive(): boolean {
        return this._state === FileSystemWatcherState.ACTIVE;
    }


    public get isStopped(): boolean {
        return this._state === FileSystemWatcherState.STOPPED;
    }


    public get isBroken(): boolean {
        return this._state === FileSystemWatcherState.BROKEN;
    }


    public constructor(path: Path, persistent: boolean = false, recursive: boolean = false) {
        this._path = path;
        this._persistent = persistent;
        this._recursive = recursive;
    }


    public watch(): void {
        if (this._watcher != null) {
            throw new InvalidStateException('File system watcher already launched.');
        }

        this._watcher = watch(this.path.toString(), {
            persistent: this._persistent,
            recursive: this._recursive
        });

        this._watcher.on('change', this.handleChange);
        this._watcher.on('close', this.handleClose);
        this._watcher.on('error', this.handleError);

        this.setState(FileSystemWatcherState.ACTIVE);
    }


    public stop(): void {
        if (this._watcher != null) {
            this._watcher.close();
        }
    }


    @Delegate
    private handleChange(changeType: ChangeType, fileName: string | Buffer | URL) {
        const path = new Path(fileName.toString());
    }


    @Delegate
    private handleClose() {
        this.setState(FileSystemWatcherState.STOPPED);
    }


    @Delegate
    private handleError(error: Error) {
        this.setState(FileSystemWatcherState.BROKEN);
    }


    private setState(state: FileSystemWatcherState): void {
        this._state = state;
    }
}
