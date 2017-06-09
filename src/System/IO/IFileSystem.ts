import {IFileSystemEntry} from './IFileSystemEntry';
import {AccessPermissions} from './AccessPermissions';
import {AccessMode} from './AccessMode';
import {FileMode} from './FileMode';
import {FileDescriptor} from './types';
import {ReadOnlyCollection} from '../../Core/Collections/ReadOnlyCollection';


export interface IFileSystem {
    open(fullName: string, fileMode?: FileMode, accessPermissions?: AccessPermissions): Promise<FileDescriptor>;
    read(fileDescriptor: FileDescriptor, position: number, length: number): Promise<Buffer>;
    write(fileDescriptor: FileDescriptor, position: number, buffer: Buffer): Promise<number>;
    flush(fileDescriptor: FileDescriptor): Promise<void>;
    close(fileDescriptor: FileDescriptor): Promise<void>;

    createFile(
        fileName: string,
        accessPermissions?: AccessPermissions,
        truncate?: boolean,
        overwrite?: boolean
    ): Promise<void>;
    writeFile(fileName: string, fileContent: Buffer, accessPermissions?: AccessPermissions): Promise<void>;
    readFile(fileName: string): Promise<Buffer>;
    removeFile(fileName: string): Promise<void>;
    fileExists(fileName: string): Promise<boolean>;

    createDirectory(directoryName: string, accessPermissions?: AccessPermissions): Promise<void>;
    readDirectory(directoryName: string): Promise<ReadOnlyCollection<IFileSystemEntry>>;
    removeDirectory(directoryName: string): Promise<void>;
    directoryExists(directoryName: string): Promise<boolean>;

    checkAccess(fullName: string, accessMode?: AccessMode): Promise<void>;
    getEntry(fullName: string): Promise<IFileSystemEntry>;
    getPermissions(fullName: string): Promise<AccessPermissions>;
    setPermissions(fullName: string, accessPermissions: AccessPermissions): Promise<void>;
    setOwner(fullName: string, userId: number, groupId: number): Promise<void>;

    createSymbolicLink(fullName: string, linkName: string): Promise<void>;
    createLink(fullName: string, linkName: string): Promise<void>;
    readLink(linkName: string): Promise<string>;

    getAbsolutePath(path: string): Promise<string>;

    move(sourceName: string, destinationName: string): Promise<void>;
}

