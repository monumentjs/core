import {FileSystemEntryProcessor} from './types';
import {FileSystemEntry} from './FileSystemEntry';
import {CancellationToken} from '../../async/main/CancellationToken';


export class FileSystemWalkerContext extends CancellationToken {
    private _startDirectory: string;
    private _entryProcessor: FileSystemEntryProcessor;
    private _currentDirectory: string;
    private _currentLevel: number = 1;


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


    public constructor(startDirectory: string, entryProcessor: FileSystemEntryProcessor) {
        super();

        this._startDirectory = startDirectory;
        this._currentDirectory = startDirectory;
        this._entryProcessor = entryProcessor;
    }


    public processEntry(entry: FileSystemEntry): Promise<void> {
        return this.entryProcessor(entry, this);
    }
}
