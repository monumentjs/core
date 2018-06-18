import {
    access,
    chmod,
    chown,
    createReadStream,
    createWriteStream,
    link,
    lstat,
    mkdir,
    readdir,
    readlink,
    ReadStream,
    realpath,
    rename,
    rmdir,
    Stats,
    symlink,
    unlink,
    WriteStream
} from 'fs';
import {Path} from '../../path/Path';
import {FileStorage} from '../FileStorage';
import {AccessPermissions} from '../AccessPermissions';
import {IOException} from '../IOException';
import {AccessMode} from '../AccessMode';
import {DirectoryContent} from '../DirectoryContent';
import {LocalLink} from './LocalLink';
import {LocalFile} from './LocalFile';
import {LocalDirectory} from './LocalDirectory';
import {LocalFileInputStream} from './LocalFileInputStream';
import {LocalFileOutputStream} from './LocalFileOutputStream';
import ErrnoException = NodeJS.ErrnoException;
import {Component} from '@monument/core/main/stereotype/Component';
import {DeferredObject} from '@monument/core/main/async/DeferredObject';
import {ArrayList} from '@monument/core/main/collections/ArrayList';


@Component
export class LocalFileSystem implements FileStorage {

    public async getFile(
        path: Path
    ): Promise<LocalFile> {
        const stats: Stats = await this.getStats(path);

        if (!stats.isFile()) {
            throw new IOException(`File system entry at "${path}" is not a file.`);
        }

        return new LocalFile(path, stats);
    }


    public removeFile(
        path: Path
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        unlink(path.toString(), (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public async fileExists(
        path: Path
    ): Promise<boolean> {
        let stats: Stats | undefined;
        let error: ErrnoException | undefined;

        try {
            stats = await this.getStats(path);
        } catch (ex) {
            error = ex;
        }

        if (stats != null) {
            if (!stats.isFile()) {
                throw new IOException(`File system entry at path "${path}" exists but it is not a file.`);
            }

            return true;
        }

        return error != null;
    }


    public createDirectory(
        path: Path,
        accessPermissions: AccessPermissions = AccessPermissions.DEFAULT
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        mkdir(path.toString(), accessPermissions, (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public async createPath(
        path: Path,
        accessPermissions: AccessPermissions = AccessPermissions.DEFAULT
    ): Promise<void> {
        const names: string[] = path.split();
        const segments: string[] = [];

        for (const name of names) {
            segments.push(name);

            const dirName: Path = Path.join(segments);

            if (!await this.directoryExists(dirName)) {
                await this.createDirectory(dirName, accessPermissions);
            }
        }
    }


    public async readDirectory(
        path: Path
    ): Promise<DirectoryContent> {
        const entryNames: string[] = await new Promise<string[]>((resolve, reject) => {
            readdir(path.toString(), (error: ErrnoException, names: string[]): void => {
                if (error != null) {
                    reject(error);
                } else {
                    resolve(names);
                }
            });
        });

        const directories: ArrayList<LocalDirectory> = new ArrayList();
        const files: ArrayList<LocalFile> = new ArrayList();
        const links: ArrayList<LocalLink> = new ArrayList();

        for (const name of entryNames) {
            const currentPath: Path = path.resolve(new Path(name));
            const stats: Stats = await this.getStats(currentPath);

            if (stats.isFile()) {
                files.add(new LocalFile(currentPath, stats));
            }

            if (stats.isDirectory()) {
                directories.add(new LocalDirectory(currentPath, stats));
            }

            if (stats.isSymbolicLink()) {
                links.add(new LocalLink(currentPath, stats));
            }
        }

        return new DirectoryContent(directories, files, links);
    }


    public removeDirectory(
        path: Path
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        rmdir(path.toString(), (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public async getDirectory(path: Path): Promise<LocalDirectory> {
        const stats: Stats = await this.getStats(path);

        if (!stats.isDirectory()) {
            throw new IOException(`File system entry at "${path}" is not a directory.`);
        }

        return new LocalDirectory(path, stats);
    }


    public async directoryExists(
        path: Path
    ): Promise<boolean> {
        let stats: Stats | undefined;
        let error: ErrnoException | undefined;

        try {
            stats = await this.getStats(path);
        } catch (ex) {
            error = ex;
        }

        if (stats != null) {
            if (!stats.isDirectory()) {
                throw new IOException(`File system entry at path "${path}" exists but it is not a directory.`);
            }

            return true;
        }

        return error != null;
    }


    public checkAccess(
        path: Path,
        accessMode: AccessMode = AccessMode.AVAILABILITY
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        access(path.toString(), accessMode, (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public setPermissions(
        path: Path,
        accessPermissions: AccessPermissions
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        chmod(path.toString(), accessPermissions, (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public setOwner(
        path: Path,
        userId: number,
        groupId: number
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        chown(path.toString(), userId, groupId, (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public createSymbolicLink(
        path: Path,
        linkName: Path
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        symlink(path.toString(), linkName.toString(), undefined, (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public createLink(
        path: Path,
        linkName: Path
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        link(path.toString(), linkName.toString(), (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public readLink(linkName: Path): Promise<Path> {
        const deferred: DeferredObject<Path> = new DeferredObject();

        readlink(linkName.toString(), (error: ErrnoException, sourcePath: string): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(new Path(sourcePath));
            }
        });

        return deferred.promise;
    }


    public getAbsolutePath(
        path: Path
    ): Promise<Path> {
        const deferred: DeferredObject<Path> = new DeferredObject();

        realpath(path.toString(), (error: ErrnoException, absolutePath: string): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(new Path(absolutePath));
            }
        });

        return deferred.promise;
    }


    public move(
        sourceName: Path,
        destinationName: Path
    ): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        rename(sourceName.toString(), destinationName.toString(), (error: ErrnoException): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public readFile(filePath: Path): LocalFileInputStream {
        const stream: ReadStream = createReadStream(filePath.toString());

        return new LocalFileInputStream(filePath, stream);
    }


    public writeFile(filePath: Path): LocalFileOutputStream {
        const stream: WriteStream = createWriteStream(filePath.toString());

        return new LocalFileOutputStream(filePath, stream);
    }


    private getStats(path: Path): Promise<Stats> {
        const deferred: DeferredObject<Stats> = new DeferredObject();

        lstat(path.toString(), (error: ErrnoException, stats: Stats): void => {
            if (error != null) {
                deferred.reject(error);
            } else {
                deferred.resolve(stats);
            }
        });

        return deferred.promise;
    }
}
