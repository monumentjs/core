import * as FileSystemModule from 'fs';
import {AsyncResult} from '../../Core/types';
import {AccessPermissions, AccessMode, IFileSystemStats, FileMode} from './types';


export default class FileSystem {
    public static async getStats(fullName: string): AsyncResult<IFileSystemStats> {
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


    public static async setOwner(fullName: string, userId: number, groupId: number): AsyncResult<void> {
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


    public static async createSymbolicLink(fullName: string, alias: string): AsyncResult<void> {
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


    public static async createLink(fullName: string, alias: string): AsyncResult<void> {
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
        fileName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<number> {
        return new Promise<number>((resolve, reject) => {
            FileSystemModule.open(
                fileName,
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
        return new Promise<void>((resolve, reject) => {
            FileSystemModule.writeFile(
                fileName,
                fileContent, {
                    mode: accessPermissions
                },
                (error: Error) => {
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
