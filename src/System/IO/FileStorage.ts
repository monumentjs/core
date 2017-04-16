import {IFileSystem} from './IFileSystem';
import FileSystem from './FileSystem';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export default class FileStorage {
    private static _instance: FileStorage;


    public static get instance(): FileStorage {
        if (!this._instance) {
            this._instance = new FileStorage();
        }

        return this._instance;
    }


    private _fileSystem: IFileSystem;


    private constructor() {
        this._fileSystem = new FileSystem();
    }


    public get fileSystem(): IFileSystem {
        return this._fileSystem;
    }


    public set fileSystem(value: IFileSystem) {
        assertArgumentNotNull('value', value);

        this._fileSystem = value;
    }
}
