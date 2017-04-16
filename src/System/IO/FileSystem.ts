import * as fs from 'fs';
import {AsyncResult} from '../../Core/types';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {callAsyncMethod} from '../../Core/Async/Utils';
import DateTime from '../../Core/Time/DateTime';
import {IFileSystem} from './IFileSystem';
import {FileSystemEntry} from './FileSystemEntry';
import {AccessPermissions} from './AccessPermissions';
import {FileMode} from './FileMode';
import {AccessMode} from './AccessMode';
import {FileDescriptor} from './types';
import IOException from './IOException';
import {FileSystemEntryType} from './FileSystemEntryType';


export default class FileSystem implements IFileSystem {
    public async getStats(fullName: string): AsyncResult<FileSystemEntry> {
        assertArgumentNotNull('fullName', fullName);

        return new Promise<FileSystemEntry>((resolve, reject) => {
            fs.lstat(fullName, (error: Error, stats: fs.Stats) => {
                if (error) {
                    reject(new IOException(error.message));
                    return;
                }

                let accessPermissions: AccessPermissions = stats.mode & 0o777;
                let type: FileSystemEntryType;

                if (stats.isFile()) {
                    type = FileSystemEntryType.File;
                } else if (stats.isDirectory()) {
                    type = FileSystemEntryType.Directory;
                } else if (stats.isSymbolicLink()) {
                    type = FileSystemEntryType.SymbolicLink;
                } else if (stats.isSocket()) {
                    type = FileSystemEntryType.Socket;
                } else if (stats.isCharacterDevice()) {
                    type = FileSystemEntryType.CharacterDevice;
                } else if (stats.isBlockDevice()) {
                    type = FileSystemEntryType.BlockDevice;
                } else {
                    type = FileSystemEntryType.FIFO;
                }

                resolve({
                    type: type,

                    length: stats.size,

                    lastAccessTime: DateTime.fromDate(stats.atime),
                    lastWriteTime: DateTime.fromDate(stats.mtime),
                    lastChangeTime: DateTime.fromDate(stats.ctime),
                    creationTime: DateTime.fromDate(stats.birthtime),

                    deviceId: stats.dev,
                    specialDeviceId: stats.rdev,
                    inode: stats.ino,

                    accessPermissions: accessPermissions,
                    owner: {
                        userId: stats.uid,
                        groupId: stats.gid
                    },

                    hardLinksCount: stats.nlink,
                    sizeOfAllocatedBlock: stats.blksize,
                    countOfAllocatedBlocks: stats.blocks,
                });
            });
        });
    }


    public async createFile(
        fileName: string,
        accessPermissions: AccessPermissions = AccessPermissions.Default,
        truncate: boolean = true,
        overwrite: boolean = true
    ): AsyncResult<void> {
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
    ): AsyncResult<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('fileContent', fileContent);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return callAsyncMethod<void>(fs, 'writeFile', fileName, fileContent, {
            mode: accessPermissions
        });
    }


    public readFile(fileName: string): AsyncResult<Buffer> {
        assertArgumentNotNull('fileName', fileName);

        return callAsyncMethod<Buffer>(fs, 'readFile', fileName);
    }


    public removeFile(fullName: string): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);

        return callAsyncMethod<void>(fs, 'unlink', fullName);
    }


    public async fileExists(fileName: string): AsyncResult<boolean> {
        assertArgumentNotNull('fileName', fileName);

        let entry: FileSystemEntry;

        try {
            entry = await this.getStats(fileName);
        } catch (ex) {
            return false;
        }

        if (entry.type !== FileSystemEntryType.File) {
            throw new IOException(`File system entry at path "${fileName}" exists but it is not a file.`);
        }

        return true;
    }


    public createDirectory(
        directoryName: string,
        accessPermissions: AccessPermissions = AccessPermissions.All
    ): AsyncResult<void> {
        assertArgumentNotNull('directoryName', directoryName);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return callAsyncMethod<void>(fs, 'mkdir', directoryName, accessPermissions);
    }


    public readDirectory(directoryName: string): AsyncResult<string[]> {
        assertArgumentNotNull('directoryName', directoryName);

        return callAsyncMethod<string[]>(fs, 'readdir', directoryName);
    }


    public removeDirectory(directoryName: string): AsyncResult<void> {
        assertArgumentNotNull('directoryName', directoryName);

        return callAsyncMethod<void>(fs, 'rmdir', directoryName);
    }


    public async directoryExists(directoryName: string): AsyncResult<boolean> {
        assertArgumentNotNull('directoryName', directoryName);

        let stats: FileSystemEntry;

        try {
            stats = await this.getStats(directoryName);
        } catch (ex) {
            return false;
        }

        if (stats.type !== FileSystemEntryType.Directory) {
            throw new IOException(`File system entry at path "${directoryName}" exists but it is not a directory.`);
        }

        return true;
    }


    public checkAccess(fullName: string, accessMode: AccessMode = AccessMode.Availability): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('accessMode', accessMode);

        return callAsyncMethod<void>(fs, 'access', fullName, accessMode);
    }


    public async getPermissions(fullName: string): AsyncResult<AccessPermissions> {
        assertArgumentNotNull('fullName', fullName);

        let stats: FileSystemEntry = await this.getStats(fullName);

        return stats.accessPermissions;
    }


    public setPermissions(fullName: string, accessPermissions: AccessPermissions): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return callAsyncMethod<void>(fs, 'chmod', fullName, accessPermissions);
    }


    public setOwner(fullName: string, userId: number, groupId: number): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('userId', userId);
        assertArgumentNotNull('groupId', groupId);

        return callAsyncMethod<void>(fs, 'chown', fullName, userId, groupId);
    }


    public createSymbolicLink(fullName: string, linkName: string): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('linkName', linkName);

        return callAsyncMethod<void>(fs, 'symlink', fullName, linkName, undefined);
    }


    public createLink(fullName: string, linkName: string): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('linkName', linkName);

        return callAsyncMethod<void>(fs, 'link', fullName, linkName);
    }


    public readLink(linkName: string): AsyncResult<string> {
        assertArgumentNotNull('linkName', linkName);

        return callAsyncMethod<string>(fs, 'readlink', linkName);
    }


    public getAbsolutePath(path: string): AsyncResult<string> {
        assertArgumentNotNull('path', path);

        return callAsyncMethod<string>(fs, 'realpath', path);
    }


    public move(sourceName: string, destinationName: string): AsyncResult<void> {
        assertArgumentNotNull('sourceName', sourceName);
        assertArgumentNotNull('destinationName', destinationName);

        return callAsyncMethod<void>(fs, 'rename', sourceName, destinationName);
    }


    public open(
        fullName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<FileDescriptor> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('fileMode', fileMode);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return callAsyncMethod<FileDescriptor>(fs, 'open', fullName, fileMode, accessPermissions);
    }


    public close(fileDescriptor: FileDescriptor): AsyncResult<void> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);

        return callAsyncMethod<void>(fs, 'close', fileDescriptor);
    }


    public async read(
        fileDescriptor: FileDescriptor,
        position: number,
        length: number
    ): AsyncResult<Buffer> {
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
    ): AsyncResult<number> {
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


    public flush(fileDescriptor: FileDescriptor): AsyncResult<void> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);

        return callAsyncMethod<void>(fs, 'fsync');
    }
}
