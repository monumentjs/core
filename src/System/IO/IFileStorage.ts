import {AccessPermissions} from './AccessPermissions';
import {FileSystemEntry} from './FileSystemEntry';
import {AccessMode} from './AccessMode';
import {ReadOnlyCollection} from '../../Core/Collections/ReadOnlyCollection';


export interface IFileStorage {
    createFile(
        fileName: string,
        accessPermissions?: AccessPermissions,
        truncate?: boolean,
        overwrite?: boolean
    ): Promise<void>;

    writeFile(
        fileName: string,
        fileContent: Buffer,
        accessPermissions?: AccessPermissions
    ): Promise<void>;

    readFile(fileName: string): Promise<Buffer>;
    removeFile(fileName: string): Promise<void>;
    fileExists(fileName: string): Promise<boolean>;
    createDirectory(directoryName: string, accessPermissions?: AccessPermissions): Promise<void>;
    readDirectory(directoryName: string): Promise<ReadOnlyCollection<FileSystemEntry>>;
    removeDirectory(directoryName: string): Promise<void>;
    directoryExists(directoryName: string): Promise<boolean>;
    checkAccess(fullName: string, accessMode?: AccessMode): Promise<void>;
    getEntry(fullName: string): Promise<FileSystemEntry>;
    getPermissions(fullName: string): Promise<AccessPermissions>;
    setPermissions(fullName: string, accessPermissions: AccessPermissions): Promise<void>;
    setOwner(fullName: string, userId: number, groupId: number): Promise<void>;
    createSymbolicLink(fullName: string, linkName: string): Promise<void>;
    createLink(fullName: string, linkName: string): Promise<void>;
    readLink(linkName: string): Promise<string>;
    getAbsolutePath(path: string): Promise<string>;
    move(sourceName: string, destinationName: string): Promise<void>;
}
