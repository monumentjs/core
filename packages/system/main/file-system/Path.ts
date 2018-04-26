import {isAbsolute, join, parse, ParsedPath, relative, resolve, posix, win32} from 'path';
import {Cloneable} from '@monument/core/main/Cloneable';
import {Equatable} from '@monument/core/main/Equatable';
import {JSONSerializable} from '@monument/core/main/JSONSerializable';
import {StringUtils} from '@monument/text/main/StringUtils';
import {PathFormat} from './PathFormat';


export class Path implements Cloneable<Path>, Equatable<Path | string>, JSONSerializable<string> {
    public static readonly PATH_SEGMENTS_DELIMITERS: string = '/\\';


    public static cast(path: Path | string): Path {
        if (path instanceof Path) {
            return path;
        }

        return new Path(path);
    }


    public static isAbsolute(path: Path | string): boolean {
        return isAbsolute(path.toString());
    }


    public static getFormat(path: Path | string): PathFormat {
        path = path.toString();

        if (path.includes(posix.sep)) {
            return PathFormat.POSIX;
        }

        if (path.includes(win32.sep)) {
            return PathFormat.WIN32;
        }

        return PathFormat.UNKNOWN;
    }


    public static relative(from: Path | string, to: Path | string): string {
        return relative(from.toString(), to.toString());
    }


    public static resolve(segments: Iterable<Path | string>): string {
        return resolve(...Array.prototype.map.call(segments, (segment: Path | string) => {
            return segment.toString();
        }));
    }


    public static concat(segments: Iterable<Path | string>): string {
        return join(...Array.prototype.map.call(segments, (segment: Path | string) => {
            return segment.toString();
        }));
    }


    public static split(path: Path | string): string[] {
        let segments = StringUtils.split(path.toString(), Path.PATH_SEGMENTS_DELIMITERS);

        if (this.isAbsolute(path) && this.getFormat(path) === PathFormat.POSIX) {
            segments.unshift(posix.sep);
        }

        return segments;
    }


    private readonly _parsedPath: ParsedPath;
    private readonly _originalPath: string;


    public get originalPath(): string {
        return this._originalPath;
    }


    public get directoryName(): string {
        return this._parsedPath.dir;
    }


    public get baseName(): string {
        return this._parsedPath.base;
    }


    public get baseNameWithoutExtension(): string {
        return this._parsedPath.name;
    }


    public get extension(): string {
        return this._parsedPath.ext;
    }


    public get root(): string {
        return this._parsedPath.root;
    }


    public get isAbsolute(): boolean {
        return isAbsolute(this._originalPath);
    }


    public constructor(path: string) {
        this._originalPath = path;
        this._parsedPath = parse(path);
    }


    public equals(other: Path | string): boolean {
        return this.toString() === other.toString();
    }


    public clone(): Path {
        return new Path(this._originalPath);
    }


    public toJSON(): string {
        return this.toString();
    }


    public toString(): string {
        return this._originalPath;
    }
}
