import {FileSystemEntry} from './FileSystemEntry';
import {AsyncResult} from '../../Core/types';
import {AccessPermissions} from './AccessPermissions';
import {AccessMode} from './AccessMode';
import {FileMode} from './FileMode';


export interface IFileSystem {
    open(fullName: string, fileMode?: FileMode, accessPermissions?: AccessPermissions): AsyncResult<number>;
    read(fileDescriptor: number, position: number, length: number): AsyncResult<Buffer>;
    write(fileDescriptor: number, position: number, buffer: Buffer): AsyncResult<number>;
    flush(fileDescriptor: number): AsyncResult<void>;
    close(fileDescriptor: number): AsyncResult<void>;

    createFile(
        fileName: string,
        accessPermissions?: AccessPermissions,
        truncate?: boolean,
        overwrite?: boolean
    ): AsyncResult<void>;
    writeFile(fileName: string, fileContent: Buffer, accessPermissions?: AccessPermissions): AsyncResult<void>;
    readFile(fileName: string): AsyncResult<Buffer>;
    removeFile(fileName: string): AsyncResult<void>;
    fileExists(fileName: string): AsyncResult<boolean>;

    createDirectory(directoryName: string, accessPermissions?: AccessPermissions): AsyncResult<void>;
    readDirectory(directoryName: string): AsyncResult<string[]>;
    removeDirectory(directoryName: string): AsyncResult<void>;
    directoryExists(directoryName: string): AsyncResult<boolean>;

    checkAccess(fullName: string, accessMode?: AccessMode): AsyncResult<void>;
    getStats(fullName: string): AsyncResult<FileSystemEntry>;
    getPermissions(fullName: string): AsyncResult<AccessPermissions>;
    setPermissions(fullName: string, accessPermissions: AccessPermissions): AsyncResult<void>;
    setOwner(fullName: string, userId: number, groupId: number): AsyncResult<void>;

    createSymbolicLink(fullName: string, linkName: string): AsyncResult<void>;
    createLink(fullName: string, linkName: string): AsyncResult<void>;
    readLink(linkName: string): AsyncResult<string>;

    getAbsolutePath(path: string): AsyncResult<string>;

    move(sourceName: string, destinationName: string): AsyncResult<void>;
}

