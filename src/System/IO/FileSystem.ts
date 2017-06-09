import * as fs from 'fs';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {callAsyncMethod} from '../../Core/Async/Utils';
import {IFileSystem} from './IFileSystem';
import {FileSystemEntry} from './FileSystemEntry';
import {AccessPermissions} from './AccessPermissions';
import {FileMode} from './FileMode';
import {AccessMode} from './AccessMode';
import {FileDescriptor} from './types';
import {IOException} from './IOException';
import {ReadOnlyCollection} from '../../Core/Collections/ReadOnlyCollection';
import {Path} from './Path';
import {FileSystemEntryType} from './FileSystemEntryType';


export class FileSystem implements IFileSystem {

    public getEntry(fullName: string): Promise<FileSystemEntry> {
        assertArgumentNotNull('fullName', fullName);

        return new Promise<FileSystemEntry>((resolve, reject) => {
            fs.lstat(fullName, (error: Error, stats: fs.Stats): void => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(new FileSystemEntry(fullName, stats));
            });
        });
    }


    public async createFile(
        fileName: string,
        accessPermissions: AccessPermissions = AccessPermissions.Default,
        truncate: boolean = true,
        overwrite: boolean = true
    ): Promise<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('accessPermissions', accessPermissions);
        assertArgumentNotNull('truncate', truncate);
        assertArgumentNotNull('overwrite', overwrite);

        let fd: FileDescriptor;
        let fileMode: FileMode = FileMode.Create | FileMode.NonBlock;

        if (truncate) {
            fileMode = fileMode | FileMode.Truncate;
        }

        if (!overwrite) {
            fileMode = fileMode | FileMode.Exclusive;
        }

        fd = await this.open(fileName, fileMode, accessPermissions);

        await this.close(fd);
    }


    public writeFile(
        fileName: string,
        fileContent: Buffer,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): Promise<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('fileContent', fileContent);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return callAsyncMethod<void>(fs, 'writeFile', fileName, fileContent, {
            mode: accessPermissions
        });
    }


    public readFile(fileName: string): Promise<Buffer> {
        assertArgumentNotNull('fileName', fileName);

        return callAsyncMethod<Buffer>(fs, 'readFile', fileName);
    }


    public removeFile(fullName: string): Promise<void> {
        assertArgumentNotNull('fullName', fullName);

        return callAsyncMethod<void>(fs, 'unlink', fullName);
    }


    public async fileExists(fileName: string): Promise<boolean> {
        assertArgumentNotNull('fileName', fileName);

        let entry: FileSystemEntry;

        try {
            entry = await this.getEntry(fileName);
        } catch (ex) {
            return false;
        }

        if (entry.entryType !== FileSystemEntryType.File) {
            throw new IOException(`File system entry at path "${fileName}" exists but it is not a file.`);
        }

        return true;
    }


    public createDirectory(
        directoryName: string,
        accessPermissions: AccessPermissions = AccessPermissions.All
    ): Promise<void> {
        assertArgumentNotNull('directoryName', directoryName);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return callAsyncMethod<void>(fs, 'mkdir', directoryName, accessPermissions);
    }


    public async readDirectory(directoryName: string): Promise<ReadOnlyCollection<FileSystemEntry>> {
        assertArgumentNotNull('directoryName', directoryName);

        let names: string[] = await callAsyncMethod<string[]>(fs, 'readdir', directoryName);
        let entries: FileSystemEntry[] = await Promise.all(names.map((name: string): Promise<FileSystemEntry> => {
            let fullName: string = Path.concat([directoryName, name]);

            return this.getEntry(fullName);
        }));

        return new ReadOnlyCollection<FileSystemEntry>(entries);
    }


    public removeDirectory(directoryName: string): Promise<void> {
        assertArgumentNotNull('directoryName', directoryName);

        return callAsyncMethod<void>(fs, 'rmdir', directoryName);
    }


    public async directoryExists(directoryName: string): Promise<boolean> {
        assertArgumentNotNull('directoryName', directoryName);

        let entry: FileSystemEntry;

        try {
            entry = await this.getEntry(directoryName);
        } catch (ex) {
            return false;
        }

        if (entry.entryType !== FileSystemEntryType.Directory) {
            throw new IOException(`File system entry at path "${directoryName}" exists but it is not a directory.`);
        }

        return true;
    }


    public checkAccess(fullName: string, accessMode: AccessMode = AccessMode.Availability): Promise<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('accessMode', accessMode);

        return callAsyncMethod<void>(fs, 'access', fullName, accessMode);
    }


    public async getPermissions(fullName: string): Promise<AccessPermissions> {
        assertArgumentNotNull('fullName', fullName);

        let stats: FileSystemEntry = await this.getEntry(fullName);

        return stats.accessPermissions;
    }


    public setPermissions(fullName: string, accessPermissions: AccessPermissions): Promise<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return callAsyncMethod<void>(fs, 'chmod', fullName, accessPermissions);
    }


    public setOwner(fullName: string, userId: number, groupId: number): Promise<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('userId', userId);
        assertArgumentNotNull('groupId', groupId);

        return callAsyncMethod<void>(fs, 'chown', fullName, userId, groupId);
    }


    public createSymbolicLink(fullName: string, linkName: string): Promise<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('linkName', linkName);

        return callAsyncMethod<void>(fs, 'symlink', fullName, linkName, undefined);
    }


    public createLink(fullName: string, linkName: string): Promise<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('linkName', linkName);

        return callAsyncMethod<void>(fs, 'link', fullName, linkName);
    }


    public readLink(linkName: string): Promise<string> {
        assertArgumentNotNull('linkName', linkName);

        return callAsyncMethod<string>(fs, 'readlink', linkName);
    }


    public getAbsolutePath(path: string): Promise<string> {
        assertArgumentNotNull('path', path);

        return callAsyncMethod<string>(fs, 'realpath', path);
    }


    public move(sourceName: string, destinationName: string): Promise<void> {
        assertArgumentNotNull('sourceName', sourceName);
        assertArgumentNotNull('destinationName', destinationName);

        return callAsyncMethod<void>(fs, 'rename', sourceName, destinationName);
    }


    public open(
        fullName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): Promise<FileDescriptor> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('fileMode', fileMode);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return callAsyncMethod<FileDescriptor>(fs, 'open', fullName, fileMode, accessPermissions);
    }


    public close(fileDescriptor: FileDescriptor): Promise<void> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);

        return callAsyncMethod<void>(fs, 'close', fileDescriptor);
    }


    public async read(
        fileDescriptor: FileDescriptor,
        position: number,
        length: number
    ): Promise<Buffer> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);
        assertArgumentNotNull('position', position);
        assertArgumentNotNull('length', length);

        let buffer: Buffer = Buffer.alloc(length);

        let bytesRead: number = await callAsyncMethod<number>(
            fs,
            'read',
            fileDescriptor,             // File descriptor, returned by `open` method
            buffer,                     // Buffer to write bytes in
            0,                          // Initial position in buffer
            length,                     // How much bytes to read
            position                    // Initial position in file
        );

        if (bytesRead < length) {
            buffer = buffer.slice(0, bytesRead);
        }

        return buffer;
    }


    public write(
        fileDescriptor: FileDescriptor,
        position: number,
        buffer: Buffer
    ): Promise<number> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);
        assertArgumentNotNull('position', position);
        assertArgumentNotNull('buffer', buffer);

        return callAsyncMethod<number>(
            fs,
            'write',
            fileDescriptor,             // File descriptor, returned by `open` method
            buffer,                     // Buffer with bytes to write
            0,                          // Initial position in buffer
            buffer.length,              // How much bytes to write
            position,                   // Initial position in file
        );
    }


    public flush(fileDescriptor: FileDescriptor): Promise<void> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);

        return callAsyncMethod<void>(fs, 'fsync');
    }
}
