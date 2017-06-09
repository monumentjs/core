import {IFileSystem} from './IFileSystem';
import {FileSystem} from './FileSystem';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {FileMode} from './FileMode';
import {AccessPermissions} from './AccessPermissions';
import {FileSystemEntry} from './FileSystemEntry';
import {AccessMode} from './AccessMode';
import {FileDescriptor} from './types';
import {ReadOnlyCollection} from '../../Core/Collections/ReadOnlyCollection';


export class FileStorage {
    public static get fileSystem(): IFileSystem {
        return this._fileSystem;
    }


    public static set fileSystem(value: IFileSystem) {
        assertArgumentNotNull('value', value);

        this._fileSystem = value;
    }


    public static open(
        fullName: string,
        fileMode?: FileMode,
        accessPermissions?: AccessPermissions
    ): Promise<FileDescriptor> {
        return this.fileSystem.open(fullName, fileMode, accessPermissions);
    }


    public static read(fileDescriptor: FileDescriptor, position: number, length: number): Promise<Buffer> {
        return this.fileSystem.read(fileDescriptor, position, length);
    }


    public static write(fileDescriptor: FileDescriptor, position: number, buffer: Buffer): Promise<number> {
        return this.fileSystem.write(fileDescriptor, position, buffer);
    }


    public static flush(fileDescriptor: FileDescriptor): Promise<void> {
        return this.fileSystem.flush(fileDescriptor);
    }


    public static close(fileDescriptor: FileDescriptor): Promise<void> {
        return this.fileSystem.close(fileDescriptor);
    }


    public static createFile(
        fileName: string,
        accessPermissions?: AccessPermissions,
        truncate?: boolean,
        overwrite?: boolean
    ): Promise<void> {
        return this.fileSystem.createFile(fileName, accessPermissions, truncate, overwrite);
    }


    public static writeFile(
        fileName: string,
        fileContent: Buffer,
        accessPermissions?: AccessPermissions
    ): Promise<void> {
        return this.fileSystem.writeFile(fileName, fileContent, accessPermissions);
    }


    public static readFile(fileName: string): Promise<Buffer> {
        return this.fileSystem.readFile(fileName);
    }


    public static removeFile(fileName: string): Promise<void> {
        return this.fileSystem.removeFile(fileName);
    }


    public static fileExists(fileName: string): Promise<boolean> {
        return this.fileSystem.fileExists(fileName);
    }


    public static createDirectory(directoryName: string, accessPermissions?: AccessPermissions): Promise<void> {
        return this.fileSystem.createDirectory(directoryName, accessPermissions);
    }


    public static readDirectory(directoryName: string): Promise<ReadOnlyCollection<FileSystemEntry>> {
        return this.fileSystem.readDirectory(directoryName);
    }


    public static removeDirectory(directoryName: string): Promise<void> {
        return this.fileSystem.removeDirectory(directoryName);
    }


    public static directoryExists(directoryName: string): Promise<boolean> {
        return this.fileSystem.directoryExists(directoryName);
    }


    public static checkAccess(fullName: string, accessMode?: AccessMode): Promise<void> {
        return this.fileSystem.checkAccess(fullName, accessMode);
    }


    public static getEntry(fullName: string): Promise<FileSystemEntry> {
        return this.fileSystem.getEntry(fullName);
    }


    public static getPermissions(fullName: string): Promise<AccessPermissions> {
        return this.fileSystem.getPermissions(fullName);
    }


    public static setPermissions(fullName: string, accessPermissions: AccessPermissions): Promise<void> {
        return this.fileSystem.setPermissions(fullName, accessPermissions);
    }


    public static setOwner(fullName: string, userId: number, groupId: number): Promise<void> {
        return this.fileSystem.setOwner(fullName, userId, groupId);
    }


    public static createSymbolicLink(fullName: string, linkName: string): Promise<void> {
        return this.fileSystem.createSymbolicLink(fullName, linkName);
    }


    public static createLink(fullName: string, linkName: string): Promise<void> {
        return this.fileSystem.createLink(fullName, linkName);
    }


    public static readLink(linkName: string): Promise<string> {
        return this.fileSystem.readLink(linkName);
    }


    public static getAbsolutePath(path: string): Promise<string> {
        return this.fileSystem.getAbsolutePath(path);
    }


    public static move(sourceName: string, destinationName: string): Promise<void> {
        return this.fileSystem.move(sourceName, destinationName);
    }


    private static _fileSystem: IFileSystem = new FileSystem();
}
