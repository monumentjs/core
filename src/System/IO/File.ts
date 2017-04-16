import {AsyncResult} from '../../Core/types';
import {Encoding} from '../Text/Encoding';
import {assertArgumentNotNull, assertArgumentType} from '../../Core/Assertion/Assert';
import Utf8Encoding from '../Text/Utf8Encoding';
import {FileSystemEntry} from './FileSystemEntry';
import {AccessPermissions} from './AccessPermissions';
import IOException from './IOException';
import {IFileSystem} from './IFileSystem';
import FileStorage from './FileStorage';
import {FileSystemEntryType} from './FileSystemEntryType';


export default class File {

    public static async exists(fileName: string): AsyncResult<boolean> {
        assertArgumentNotNull('fileName', fileName);

        let fileStats: FileSystemEntry;

        try {
            fileStats = await this._fileSystem.getStats(fileName);
        } catch (ex) {
            return false;
        }

        if (fileStats.type !== FileSystemEntryType.File) {
            throw new IOException(`File system entry '${fileName}' exists but it's not a file.`);
        }

        return true;
    }


    public static async create(
        fileName: string,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        await this._fileSystem.createFile(fileName, accessPermissions);
    }


    public static async writeText(
        fileName: string,
        text: string,
        encoding: Encoding = Utf8Encoding.instance
    ): AsyncResult<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('text', text);
        assertArgumentNotNull('encoding', encoding);
        assertArgumentType('encoding', encoding, Encoding);

        await this._fileSystem.writeFile(fileName, encoding.getBytes(text));
    }


    public static async readText(
        fileName: string,
        encoding: Encoding = Utf8Encoding.instance
    ): AsyncResult<string> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('encoding', encoding);

        let buffer: Buffer = await this._fileSystem.readFile(fileName);

        return encoding.getString(buffer);
    }


    public static async writeBytes(fileName: string, buffer: Buffer): AsyncResult<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('buffer', buffer);

        await this._fileSystem.writeFile(fileName, buffer);
    }


    public static async readBytes(fileName: string): AsyncResult<Buffer> {
        assertArgumentNotNull('fileName', fileName);

        return this._fileSystem.readFile(fileName);
    }
    
    
    private static _fileSystem: IFileSystem = FileStorage.instance.fileSystem;
}
