import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {AccessPermissions} from './AccessPermissions';
import {FileSystemEntry} from './FileSystemEntry';
import {AccessMode} from './AccessMode';
import {Path} from './Path';


export interface FileStorage {
    createFile(
        fileName: Path | string,
        accessPermissions?: AccessPermissions,
        truncate?: boolean,
        overwrite?: boolean
    ): Promise<void>;

    writeFile(
        fileName: Path | string,
        fileContent: Buffer,
        accessPermissions?: AccessPermissions
    ): Promise<void>;

    readFile(fileName: Path | string): Promise<Buffer>;

    removeFile(fileName: Path | string): Promise<void>;

    fileExists(fileName: Path | string): Promise<boolean>;

    createDirectory(directoryName: Path | string, accessPermissions?: AccessPermissions): Promise<void>;

    createPath(path: Path | string, accessPermissions?: AccessPermissions): Promise<void>;

    readDirectory(directoryName: Path | string): Promise<ReadOnlyCollection<FileSystemEntry>>;

    removeDirectory(directoryName: Path | string): Promise<void>;

    directoryExists(directoryName: Path | string): Promise<boolean>;

    checkAccess(fullName: Path | string, accessMode?: AccessMode): Promise<void>;

    getEntry(fullName: Path | string): Promise<FileSystemEntry>;

    getPermissions(fullName: Path | string): Promise<AccessPermissions>;

    setPermissions(fullName: Path | string, accessPermissions: AccessPermissions): Promise<void>;

    setOwner(fullName: Path | string, userId: number, groupId: number): Promise<void>;

    createSymbolicLink(fullName: Path | string, linkName: Path | string): Promise<void>;

    createLink(fullName: Path | string, linkName: Path | string): Promise<void>;

    readLink(linkName: Path | string): Promise<string>;

    getAbsolutePath(path: Path | string): Promise<string>;

    move(sourceName: Path | string, destinationName: Path | string): Promise<void>;
}
