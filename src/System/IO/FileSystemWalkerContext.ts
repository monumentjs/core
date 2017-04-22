import {FileSystemEntryProcessor} from './types';
import FileSystemEntry from './FileSystemEntry';
import {AsyncResult} from '../../Core/types';


export default class FileSystemWalkerContext {
    private _isCancelled: boolean = false;
    private _startDirectory: string;
    private _entryProcessor: FileSystemEntryProcessor;
    private _currentDirectory: string;
    private _currentLevel: number = 0;


    public get startDirectory(): string {
        return this._startDirectory;
    }


    public get currentDirectory(): string {
        return this._currentDirectory;
    }


    public set currentDirectory(value: string) {
        this._currentDirectory = value;
    }


    public get entryProcessor(): FileSystemEntryProcessor {
        return this._entryProcessor;
    }


    public get currentLevel(): number {
        return this._currentLevel;
    }


    public set currentLevel(value: number) {
        this._currentLevel = value;
    }


    public get isCancelled(): boolean {
        return this._isCancelled;
    }


    public constructor(startDirectory: string, entryProcessor: FileSystemEntryProcessor) {
        this._startDirectory = startDirectory;
        this._currentDirectory = startDirectory;
        this._entryProcessor = entryProcessor;
    }


    public cancel(): void {
        this._isCancelled = true;
    }


    public processEntry(entry: FileSystemEntry): AsyncResult<void> {
        return this.entryProcessor(entry, this);
    }
}
