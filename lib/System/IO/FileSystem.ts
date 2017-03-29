import * as FileSystemModule from 'fs';
import {AsyncResult} from '../../Core/types';
import {AccessPermissions, AccessMode, IFileSystemStats, FileMode} from './types';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export default class FileSystem {
    public static async getStats(fullName: string): AsyncResult<IFileSystemStats> {
        assertArgumentNotNull('fullName', fullName);

        return new Promise<IFileSystemStats>((resolve, reject) => {
            FileSystemModule.lstat(fullName, (error: Error, stats: FileSystemModule.Stats) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({
                    isFile: stats.isFile(),
                    isFIFO: stats.isFIFO(),
                    isDirectory: stats.isDirectory(),
                    isBlockDevice: stats.isBlockDevice(),
                    isCharacterDevice: stats.isCharacterDevice(),
                    isSocket: stats.isSocket(),
                    isSymbolicLink: stats.isSymbolicLink(),

                    length: stats.size,

                    lastAccessTime: stats.atime,
                    lastWriteTime: stats.mtime,
                    lastChangeTime: stats.ctime,
                    creationTime: stats.birthtime,

                    deviceId: stats.dev,
                    specialDeviceId: stats.rdev,
                    inode: stats.ino,

                    accessPermissions: stats.mode,
                    ownerUserId: stats.uid,
                    ownerGroupId: stats.gid,

                    hardLinksCount: stats.nlink,
                    sizeOfAllocatedBlock: stats.blksize,
                    countOfAllocatedBlocks: stats.blocks,
                });
            });
        });
    }


    public static async createFile(
        fullName: string,
        accessPermissions: AccessPermissions = AccessPermissions.Default,
        truncate: boolean = true,
        overwrite: boolean = true
    ): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('accessPermissions', accessPermissions);
        assertArgumentNotNull('truncate', truncate);
        assertArgumentNotNull('overwrite', overwrite);

        let fileDescriptor: number;
        let fileMode: FileMode = FileMode.Create | FileMode.NonBlock;

        if (truncate) {
            fileMode = fileMode | FileMode.Truncate;
        }

        if (!overwrite) {
            fileMode = fileMode | FileMode.Exclusive;
        }

        fileDescriptor = await this.open(fullName, fileMode, accessPermissions);

        await this.close(fileDescriptor);
    }


    public static async remove(fullName: string): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.unlink(fullName, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async checkAccess(
        fullName: string,
        accessMode: AccessMode = AccessMode.Availability
    ): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('accessMode', accessMode);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.access(fullName, accessMode, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async setPermissions(
        fullName: string,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.chmod(fullName, accessPermissions, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async setOwner(
        fullName: string,
        userId: number,
        groupId: number
    ): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('userId', userId);
        assertArgumentNotNull('groupId', groupId);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.chown(fullName, userId, groupId, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async createSymbolicLink(
        fullName: string,
        alias: string
    ): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('alias', alias);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.symlink(fullName, alias, undefined, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async createLink(
        fullName: string,
        alias: string
    ): AsyncResult<void> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('alias', alias);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.link(fullName, alias, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async readLink(fullName: string): AsyncResult<string> {
        assertArgumentNotNull('fullName', fullName);

        return new Promise<string>((resolve, reject) => {
            FileSystemModule.readlink(fullName, (error: Error, sourceName: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(sourceName);
                }
            });
        });
    }


    public static async getAbsolutePath(sourceName: string): AsyncResult<string> {
        assertArgumentNotNull('sourceName', sourceName);

        return new Promise<string>((resolve, reject) => {
            FileSystemModule.realpath(sourceName, (error: Error, absolutePath: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(absolutePath);
                }
            });
        });
    }


    public static async move(sourceName: string, destinationName: string): AsyncResult<void> {
        assertArgumentNotNull('sourceName', sourceName);
        assertArgumentNotNull('destinationName', destinationName);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.rename(sourceName, destinationName, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async open(
        fullName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<number> {
        assertArgumentNotNull('fullName', fullName);
        assertArgumentNotNull('fileMode', fileMode);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return new Promise<number>((resolve, reject) => {
            FileSystemModule.open(
                fullName,
                fileMode,
                accessPermissions,
                (error: Error, fileDescriptor: number) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(fileDescriptor);
                    }
                }
            );
        });
    }


    public static async close(fileDescriptor: number): AsyncResult<void> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.close(fileDescriptor, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async read(
        fileDescriptor: number,
        position: number,
        length: number
    ): AsyncResult<Buffer> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);
        assertArgumentNotNull('position', position);
        assertArgumentNotNull('length', length);

        return new Promise<Buffer>((resolve, reject) => {
            let buffer: Buffer = Buffer.alloc(length);

            FileSystemModule.read(
                fileDescriptor,         // File descriptor, returned by `open` method
                buffer,                 // Buffer to write bytes in
                0,                      // Initial position in buffer
                length,                 // How much bytes to read
                position,               // Initial position in file
                (error: Error, bytesRead: number) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (bytesRead < length) {
                            buffer = buffer.slice(0, bytesRead);
                        }

                        resolve(buffer);
                    }
                }
            );
        });
    }


    public static async write(
        fileDescriptor: number,
        position: number,
        buffer: Buffer
    ): AsyncResult<number> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);
        assertArgumentNotNull('position', position);
        assertArgumentNotNull('buffer', buffer);

        return new Promise<number>((resolve, reject) => {
            FileSystemModule.write(
                fileDescriptor,         // File descriptor, returned by `open` method
                buffer,                 // Buffer with bytes to write
                0,                      // Initial position in buffer
                buffer.length,          // How much bytes to write
                position,               // Initial position in file
                (error: Error, bytesWritten: number) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(bytesWritten);
                    }
                }
            );
        });
    }


    public static async flush(fileDescriptor: number): AsyncResult<void> {
        assertArgumentNotNull('fileDescriptor', fileDescriptor);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.fsync(fileDescriptor, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public static async writeFile(
        fileName: string,
        fileContent: Buffer,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('fileContent', fileContent);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        return new Promise<void>((resolve, reject) => {
            FileSystemModule.writeFile(
                fileName,
                fileContent, {
                    mode: accessPermissions
                },
                (error: NodeJS.ErrnoException) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }


    public static async readFile(fileName: string): AsyncResult<Buffer> {
        assertArgumentNotNull('fileName', fileName);

        return new Promise<Buffer>((resolve, reject) => {
            FileSystemModule.readFile(fileName, (error: Error, fileContent: Buffer) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(fileContent);
                }
            });
        });
    }
}
