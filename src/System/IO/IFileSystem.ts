import {IFileSystemEntry} from './IFileSystemEntry';
import {AsyncResult} from '../../Core/types';
import {AccessPermissions} from './AccessPermissions';
import {AccessMode} from './AccessMode';
import {FileMode} from './FileMode';
import {FileDescriptor} from './types';
import {ReadOnlyCollection} from '../../Core/Collections/ReadOnlyCollection';


export interface IFileSystem {
    open(fullName: string, fileMode?: FileMode, accessPermissions?: AccessPermissions): AsyncResult<FileDescriptor>;
    read(fileDescriptor: FileDescriptor, position: number, length: number): AsyncResult<Buffer>;
    write(fileDescriptor: FileDescriptor, position: number, buffer: Buffer): AsyncResult<number>;
    flush(fileDescriptor: FileDescriptor): AsyncResult<void>;
    close(fileDescriptor: FileDescriptor): AsyncResult<void>;

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
    readDirectory(directoryName: string): AsyncResult<ReadOnlyCollection<IFileSystemEntry>>;
    removeDirectory(directoryName: string): AsyncResult<void>;
    directoryExists(directoryName: string): AsyncResult<boolean>;

    checkAccess(fullName: string, accessMode?: AccessMode): AsyncResult<void>;
    getEntry(fullName: string): AsyncResult<IFileSystemEntry>;
    getPermissions(fullName: string): AsyncResult<AccessPermissions>;
    setPermissions(fullName: string, accessPermissions: AccessPermissions): AsyncResult<void>;
    setOwner(fullName: string, userId: number, groupId: number): AsyncResult<void>;

    createSymbolicLink(fullName: string, linkName: string): AsyncResult<void>;
    createLink(fullName: string, linkName: string): AsyncResult<void>;
    readLink(linkName: string): AsyncResult<string>;

    getAbsolutePath(path: string): AsyncResult<string>;

    move(sourceName: string, destinationName: string): AsyncResult<void>;
}

