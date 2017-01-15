import * as FSModule from 'fs';
import * as PathModule from 'path';
import {AsyncResult} from '../../Core/types';
import FileStats from './FileStats';
import Encoding from '../Text/Encoding';



export default class File {

    public static getStats(path: string): AsyncResult<FileStats> {
        return new Promise<FileStats>((resolve, reject) => {
            FSModule.stat(path, (error: Error, stats: FSModule.Stats) => {
                if (error) {
                    reject(error);
                } else if (stats.isFile()) {
                    let fileStats = new FileStats();
                    fileStats.name = PathModule.basename(path);
                    fileStats.path = path;
                    fileStats.extension = PathModule.extname(path);
                    fileStats.sizeInBytes = stats.size;
                    fileStats.creationDate = stats.ctime;
                    fileStats.lastAccessDate = stats.atime;
                    fileStats.lastModificationDate = stats.mtime;
                    resolve(fileStats);
                } else {
                    reject(new Error(`Unable to get file stats by path "${path}" because it's not a file.`));
                }
            });
        });
    }


    public static exists(path: string): AsyncResult<boolean> {
        return this.getStats(path).then(() => {
            return true;
        }, () => {
            return false;
        });
    }


    public static create(path: string, overwrite: boolean = true): AsyncResult<void> {
        return this.exists(path).then((exists: boolean) => {
            if (!exists || (exists && overwrite)) {
                return this.writeAllText(path, '', Encoding.UTF8);
            }
        });
    }


    public static writeAllText(
        path: string,
        text: string,
        encoding: Encoding = Encoding.UTF8,
        overwrite: boolean = true
    ): AsyncResult<void> {
        return File.exists(path).then((exists: boolean) => {
            if (!exists || (exists && overwrite)) {
                return new Promise<void>((resolve, reject) => {
                    FSModule.writeFile(path, text, encoding.encodingName, (error: Error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            }
        });
    }


    public static readAllText(
        path: string,
        encoding: Encoding = Encoding.UTF8
    ): AsyncResult<string> {
        if (encoding.encodingName === 'binary') {
            return Promise.reject(new Error(`Encoding '${encoding.encodingName} is not allowed.`));
        }

        return new Promise<string>((resolve, reject) => {
            FSModule.readFile(path, encoding.encodingName, (error: Error, text: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(text);
                }
            });
        });
    }


    public static writeAllBytes(
        path: string,
        buffer: Buffer,
        overwrite: boolean = true
    ): AsyncResult<void> {
        return File.exists(path).then((exists: boolean) => {
            if (!exists || (exists && overwrite)) {
                return new Promise<void>((resolve, reject) => {
                    FSModule.writeFile(path, buffer, Encoding.BINARY, (error: Error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            }
        });
    }


    public static readAllBytes(
        path: string
    ): AsyncResult<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            FSModule.readFile(path, (error: Error, buffer: Buffer) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(buffer);
                }
            });
        });
    }
}
