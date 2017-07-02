import * as fs from 'fs';
import {Assert} from '../../Core/Assertion/Assert';
import {FileSystemEntry} from './FileSystemEntry';
import {AccessPermissions} from './AccessPermissions';
import {FileMode} from './FileMode';
import {AccessMode} from './AccessMode';
import {FileDescriptor} from './types';
import {IOException} from './IOException';
import {ReadOnlyCollection} from '../../Core/Collections/ReadOnlyCollection';
import {Path} from './Path';
import {FileSystemEntryType} from './FileSystemEntryType';
import {DeferredObject} from '../../Core/Async/DeferredObject';


export class FileSystem {

    public static getEntry(fullName: string): Promise<FileSystemEntry> {
        Assert.argument('fullName', fullName).notNull();

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


    public static async createFile(
        fileName: string,
        accessPermissions: AccessPermissions = AccessPermissions.Default,
        truncate: boolean = true,
        overwrite: boolean = true
    ): Promise<void> {
        Assert.argument('fileName', fileName).notNull();
        Assert.argument('accessPermissions', accessPermissions).notNull();
        Assert.argument('truncate', truncate).notNull();
        Assert.argument('overwrite', overwrite).notNull();

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


    public static writeFile(
        fileName: string,
        fileContent: Buffer,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): Promise<void> {
        Assert.argument('fileName', fileName).notNull();
        Assert.argument('fileContent', fileContent).notNull();
        Assert.argument('accessPermissions', accessPermissions).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.writeFile(fileName, fileContent, {
            mode: accessPermissions
        }, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static readFile(fileName: string): Promise<Buffer> {
        Assert.argument('fileName', fileName).notNull();

        let deferred: DeferredObject<Buffer> = new DeferredObject<Buffer>();

        fs.readFile(fileName, (error: NodeJS.ErrnoException, content: Buffer): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(content);
            }
        });

        return deferred.promise;
    }


    public static removeFile(fullName: string): Promise<void> {
        Assert.argument('fullName', fullName).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.unlink(fullName, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static async fileExists(fileName: string): Promise<boolean> {
        Assert.argument('fileName', fileName).notNull();

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


    public static createDirectory(
        directoryName: string,
        accessPermissions: AccessPermissions = AccessPermissions.All
    ): Promise<void> {
        Assert.argument('directoryName', directoryName).notNull();
        Assert.argument('accessPermissions', accessPermissions).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.mkdir(directoryName, accessPermissions, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static readDirectory(directoryName: string): Promise<ReadOnlyCollection<FileSystemEntry>> {
        Assert.argument('directoryName', directoryName).notNull();

        let deferred: DeferredObject<ReadOnlyCollection<FileSystemEntry>> =
            new DeferredObject<ReadOnlyCollection<FileSystemEntry>>();

        fs.readdir(directoryName, (error: NodeJS.ErrnoException, names: string[]): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(Promise.all(names.map((name: string): Promise<FileSystemEntry> => {
                    let fullName: string = Path.concat([directoryName, name]);

                    return this.getEntry(fullName);
                })).then((entries: FileSystemEntry[]) => {
                    return new ReadOnlyCollection<FileSystemEntry>(entries);
                }));
            }
        });

        return deferred.promise;
    }


    public static removeDirectory(directoryName: string): Promise<void> {
        Assert.argument('directoryName', directoryName).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.rmdir(directoryName, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static async directoryExists(directoryName: string): Promise<boolean> {
        Assert.argument('directoryName', directoryName).notNull();

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


    public static checkAccess(fullName: string, accessMode: AccessMode = AccessMode.Availability): Promise<void> {
        Assert.argument('fullName', fullName).notNull();
        Assert.argument('accessMode', accessMode).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.access(fullName, accessMode, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static async getPermissions(fullName: string): Promise<AccessPermissions> {
        Assert.argument('fullName', fullName).notNull();

        let stats: FileSystemEntry = await this.getEntry(fullName);

        return stats.accessPermissions;
    }


    public static setPermissions(fullName: string, accessPermissions: AccessPermissions): Promise<void> {
        Assert.argument('fullName', fullName).notNull();
        Assert.argument('accessPermissions', accessPermissions).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.chmod(fullName, accessPermissions, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static setOwner(fullName: string, userId: number, groupId: number): Promise<void> {
        Assert.argument('fullName', fullName).notNull();
        Assert.argument('userId', userId).notNull();
        Assert.argument('groupId', groupId).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.chown(fullName, userId, groupId, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static createSymbolicLink(fullName: string, linkName: string): Promise<void> {
        Assert.argument('fullName', fullName).notNull();
        Assert.argument('linkName', linkName).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.symlink(fullName, linkName, undefined, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static createLink(fullName: string, linkName: string): Promise<void> {
        Assert.argument('fullName', fullName).notNull();
        Assert.argument('linkName', linkName).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.link(fullName, linkName, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static readLink(linkName: string): Promise<string> {
        Assert.argument('linkName', linkName).notNull();

        let deferred: DeferredObject<string> = new DeferredObject<string>();

        fs.readlink(linkName, (error: NodeJS.ErrnoException, sourcePath: string): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(sourcePath);
            }
        });

        return deferred.promise;
    }


    public static getAbsolutePath(path: string): Promise<string> {
        Assert.argument('path', path).notNull();

        let deferred: DeferredObject<string> = new DeferredObject<string>();

        fs.realpath(path, (error: NodeJS.ErrnoException, absolutePath: string): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(absolutePath);
            }
        });

        return deferred.promise;
    }


    public static move(sourceName: string, destinationName: string): Promise<void> {
        Assert.argument('sourceName', sourceName).notNull();
        Assert.argument('destinationName', destinationName).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.rename(sourceName, destinationName, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static open(
        fullName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): Promise<FileDescriptor> {
        Assert.argument('fullName', fullName).notNull();
        Assert.argument('fileMode', fileMode).notNull();
        Assert.argument('accessPermissions', accessPermissions).notNull();

        let deferred: DeferredObject<FileDescriptor> = new DeferredObject<FileDescriptor>();

        fs.open(fullName, fileMode, accessPermissions, (error: NodeJS.ErrnoException, fd: FileDescriptor): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(fd);
            }
        });

        return deferred.promise;
    }


    public static close(fileDescriptor: FileDescriptor): Promise<void> {
        Assert.argument('fileDescriptor', fileDescriptor).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.close(fileDescriptor, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public static async read(
        fileDescriptor: FileDescriptor,
        position: number,
        length: number
    ): Promise<Buffer> {
        Assert.argument('fileDescriptor', fileDescriptor).notNull();
        Assert.argument('position', position).notNull();
        Assert.argument('length', length).notNull();

        let buffer: Buffer = Buffer.alloc(length);
        let deferred: DeferredObject<Buffer> = new DeferredObject<Buffer>();

        fs.read(
            fileDescriptor,     // File descriptor, returned by `open` method
            buffer,             // Buffer to write bytes in
            0,                  // Initial position in buffer
            length,             // How much bytes to read
            position,           // Initial position in file
            (error: NodeJS.ErrnoException, bytesRead: number): void => {
                if (error) {
                    deferred.reject(error);
                    return;
                }

                if (bytesRead < length) {
                    buffer = buffer.slice(0, bytesRead);
                }

                deferred.resolve(buffer);
            }
        );

        return deferred.promise;
    }


    public static write(
        fileDescriptor: FileDescriptor,
        position: number,
        buffer: Buffer
    ): Promise<number> {
        Assert.argument('fileDescriptor', fileDescriptor).notNull();
        Assert.argument('position', position).notNull();
        Assert.argument('buffer', buffer).notNull();

        let deferred: DeferredObject<number> = new DeferredObject<number>();

        fs.write(
            fileDescriptor,             // File descriptor, returned by `open` method
            buffer,                     // Buffer with bytes to write
            0,                          // Initial position in buffer
            buffer.length,              // How much bytes to write
            position,                   // Initial position in file
            (error: NodeJS.ErrnoException, bytesWritten: number) => {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(bytesWritten);
                }
            }
        );

        return deferred.promise;
    }


    public static flush(fileDescriptor: FileDescriptor): Promise<void> {
        Assert.argument('fileDescriptor', fileDescriptor).notNull();

        let deferred: DeferredObject<void> = new DeferredObject<void>();

        fs.fsync(fileDescriptor, (error: NodeJS.ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }
}
