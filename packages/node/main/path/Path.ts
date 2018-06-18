import {isAbsolute, join, parse, ParsedPath, posix, relative, resolve, win32} from 'path';
import {PathFormat} from './PathFormat';
import {Cloneable} from '@monument/core/main/Cloneable';
import {Equatable} from '@monument/core/main/Equatable';
import {JSONSerializable} from '@monument/core/main/JSONSerializable';
import {StringUtils} from '@monument/core/main/text/StringUtils';


export class Path implements Cloneable<Path>, Equatable<Path>, JSONSerializable<string> {
    public static readonly PATH_SEGMENTS_DELIMITERS: string = '/\\';


    public static relative(from: Path, to: Path): Path {
        return new Path(relative(from.toString(), to.toString()));
    }


    public static resolve(segments: Iterable<Path>): Path {
        return new Path(resolve(...Array.prototype.map.call(segments, (segment: Path) => {
            return segment.toString();
        })));
    }


    public static join(segments: Iterable<string>): Path {
        return new Path(join(...Array.prototype.map.call(segments, (segment: Path) => {
            return segment.toString();
        })));
    }


    private readonly _parsedPath: ParsedPath;
    private readonly _originalPath: string;


    public get directoryName(): Path {
        return new Path(this._parsedPath.dir);
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


    public get hasExtension(): boolean {
        return this.extension.length > 0;
    }


    public get root(): string {
        return this._parsedPath.root;
    }


    public get isAbsolute(): boolean {
        return isAbsolute(this._originalPath);
    }


    public get format(): PathFormat {
        if (this._originalPath.includes(posix.sep)) {
            return PathFormat.POSIX;
        }

        if (this._originalPath.includes(win32.sep)) {
            return PathFormat.WIN32;
        }

        return PathFormat.UNKNOWN;
    }


    public constructor(path: string) {
        this._originalPath = path;
        this._parsedPath = parse(path);
    }


    public split(): string[] {
        const segments: string[] = StringUtils.split(this._originalPath, Path.PATH_SEGMENTS_DELIMITERS);

        if (this.isAbsolute && this.format === PathFormat.POSIX) {
            segments.unshift(posix.sep);
        }

        return segments;
    }


    public resolve(to: Path): Path {
        const path = resolve(this.toString(), to.toString());

        return new Path(path);
    }


    public equals(other: Path): boolean {
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
