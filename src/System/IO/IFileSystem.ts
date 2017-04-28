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
    flush(fileDescriptor: FileDescriptor): AsyncResult;
    close(fileDescriptor: FileDescriptor): AsyncResult;

    createFile(
        fileName: string,
        accessPermissions?: AccessPermissions,
        truncate?: boolean,
        overwrite?: boolean
    ): AsyncResult;
    writeFile(fileName: string, fileContent: Buffer, accessPermissions?: AccessPermissions): AsyncResult;
    readFile(fileName: string): AsyncResult<Buffer>;
    removeFile(fileName: string): AsyncResult;
    fileExists(fileName: string): AsyncResult<boolean>;

    createDirectory(directoryName: string, accessPermissions?: AccessPermissions): AsyncResult;
    readDirectory(directoryName: string): AsyncResult<ReadOnlyCollection<IFileSystemEntry>>;
    removeDirectory(directoryName: string): AsyncResult;
    directoryExists(directoryName: string): AsyncResult<boolean>;

    checkAccess(fullName: string, accessMode?: AccessMode): AsyncResult;
    getEntry(fullName: string): AsyncResult<IFileSystemEntry>;
    getPermissions(fullName: string): AsyncResult<AccessPermissions>;
    setPermissions(fullName: string, accessPermissions: AccessPermissions): AsyncResult;
    setOwner(fullName: string, userId: number, groupId: number): AsyncResult;

    createSymbolicLink(fullName: string, linkName: string): AsyncResult;
    createLink(fullName: string, linkName: string): AsyncResult;
    readLink(linkName: string): AsyncResult<string>;

    getAbsolutePath(path: string): AsyncResult<string>;

    move(sourceName: string, destinationName: string): AsyncResult;
}

