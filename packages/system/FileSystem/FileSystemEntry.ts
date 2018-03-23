import {Stats} from 'fs';
import {DateTime} from '../../time/main/DateTime';
import {AccessPermissions} from './AccessPermissions';
import {Path} from './Path';
import {FileSystemEntryType} from './FileSystemEntryType';


export class FileSystemEntry {
    private _creationTime: DateTime;
    private _lastWriteTime: DateTime;
    private _lastChangeTime: DateTime;
    private _lastAccessTime: DateTime;
    private _accessPermissions: AccessPermissions;
    private _entryType: FileSystemEntryType;

    private _path: Path;

    protected _stats: Stats;


    public get entryType(): FileSystemEntryType {
        return this._entryType;
    }


    public get isFile(): boolean {
        return this._stats.isFile();
    }


    public get isDirectory(): boolean {
        return this._stats.isDirectory();
    }


    public get isCharacterDevice(): boolean {
        return this._stats.isCharacterDevice();
    }


    public get isBlockDevice(): boolean {
        return this._stats.isBlockDevice();
    }


    public get isSymbolicLink(): boolean {
        return this._stats.isSymbolicLink();
    }


    public get isFIFO(): boolean {
        return this._stats.isFIFO();
    }


    public get isSocket(): boolean {
        return this._stats.isSocket();
    }


    public get path(): string {
        return this._path.originalPath;
    }


    public get directoryName(): string {
        return this._path.directoryName;
    }


    public get baseName(): string {
        return this._path.baseName;
    }


    public get baseNameWithoutExtension(): string {
        return this._path.baseNameWithoutExtension;
    }


    public get extension(): string {
        return this._path.extension;
    }


    public get root(): string {
        return this._path.root;
    }


    public get creationTime(): DateTime {
        return this._creationTime;
    }


    public get lastWriteTime(): DateTime {
        return this._lastWriteTime;
    }


    public get lastChangeTime(): DateTime {
        return this._lastChangeTime;
    }


    public get lastAccessTime(): DateTime {
        return this._lastAccessTime;
    }


    public get deviceId(): number {
        return this._stats.dev;
    }


    public get specialDeviceId(): number {
        return this._stats.rdev;
    }


    public get inode(): number {
        return this._stats.ino;
    }


    public get accessPermissions(): AccessPermissions {
        return this._accessPermissions;
    }


    public get ownerUserId(): number {
        return this._stats.uid;
    }


    public get ownerGroupId(): number {
        return this._stats.gid;
    }


    public get length(): number {
        return this._stats.size;
    }


    public get hardLinksCount(): number {
        return this._stats.nlink;
    }


    public get sizeOfAllocatedBlock(): number {
        return this._stats.blksize;
    }


    public get countOfAllocatedBlocks(): number {
        return this._stats.blocks;
    }


    public constructor(path: Path | string, stats: Stats) {
        this._path = Path.cast(path);
        this._stats = stats;
        this._lastAccessTime = DateTime.fromDate(stats.atime);
        this._lastWriteTime = DateTime.fromDate(stats.mtime);
        this._lastChangeTime = DateTime.fromDate(stats.ctime);
        this._creationTime = DateTime.fromDate(stats.birthtime);
        this._accessPermissions = stats.mode & 0o777;

        if (stats.isFile()) {
            this._entryType = FileSystemEntryType.File;
        } else if (stats.isDirectory()) {
            this._entryType = FileSystemEntryType.Directory;
        } else if (stats.isSymbolicLink()) {
            this._entryType = FileSystemEntryType.SymbolicLink;
        } else if (stats.isSocket()) {
            this._entryType = FileSystemEntryType.Socket;
        } else if (stats.isFIFO()) {
            this._entryType = FileSystemEntryType.FIFO;
        } else if (stats.isBlockDevice()) {
            this._entryType = FileSystemEntryType.BlockDevice;
        } else if (stats.isCharacterDevice()) {
            this._entryType = FileSystemEntryType.CharacterDevice;
        }
    }
}
