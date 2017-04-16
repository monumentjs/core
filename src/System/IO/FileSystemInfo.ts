import * as PathModule from 'path';
import {AsyncResult, IDisposable} from '../../Core/types';
import DirectoryInfo from './DirectoryInfo';
import InvalidOperationException from '../../Core/Exceptions/InvalidOperationException';
import DateTime from '../../Core/Time/DateTime';
import {FileSystemEntry} from './FileSystemEntry';
import {AccessPermissions} from './AccessPermissions';
import {FileSystemUser} from './FileSystemUser';
import {IFileSystem} from './IFileSystem';
import FileStorage from './FileStorage';
import {FileSystemEntryType} from './FileSystemEntryType';


export default class FileSystemInfo implements FileSystemEntry, IDisposable {
    public static async getInfo(fullPath: string): AsyncResult<FileSystemInfo> {
        let info: FileSystemInfo = new this(fullPath);

        await info.refresh();

        return info;
    }


    protected _isDisposed: boolean = false;
    protected _isRemoved: boolean = false;

    protected _fullName: string;

    protected _exists: boolean;
    protected _stats: FileSystemEntry;

    
    protected _fileSystem: IFileSystem = FileStorage.instance.fileSystem;


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public get type(): FileSystemEntryType {
        return this._stats.type;
    }


    public get exists(): boolean {
        return this._exists;
    }


    public get isFile(): boolean {
        return this._stats.type === FileSystemEntryType.File;
    }


    public get isDirectory(): boolean {
        return this._stats.type === FileSystemEntryType.Directory;
    }


    public get isFIFO(): boolean {
        return this._stats.type === FileSystemEntryType.FIFO;
    }


    public get isSymbolicLink(): boolean {
        return this._stats.type === FileSystemEntryType.SymbolicLink;
    }


    public get isSocket(): boolean {
        return this._stats.type === FileSystemEntryType.Socket;
    }


    public get isCharacterDevice(): boolean {
        return this._stats.type === FileSystemEntryType.CharacterDevice;
    }


    public get isBlockDevice(): boolean {
        return this._stats.type === FileSystemEntryType.BlockDevice;
    }


    public get creationTime(): DateTime {
        return this._stats.creationTime;
    }


    public get lastChangeTime(): DateTime {
        return this._stats.lastChangeTime;
    }


    public get lastAccessTime(): DateTime {
        return this._stats.lastAccessTime;
    }


    public get lastWriteTime(): DateTime {
        return this._stats.lastWriteTime;
    }


    public get length(): number {
        return this._stats.length;
    }


    public get fullName(): string {
        return this._fullName;
    }


    public get name(): string {
        return PathModule.basename(this._fullName);
    }


    public get extension(): string {
        return PathModule.extname(this._fullName);
    }


    public get directoryName(): string {
        return PathModule.dirname(this._fullName);
    }


    public get specialDeviceId(): number {
        return this._stats.specialDeviceId;
    }


    public get deviceId(): number {
        return this._stats.deviceId;
    }


    public get inode(): number {
        return this._stats.inode;
    }


    public get accessPermissions(): AccessPermissions {
        return this._stats.accessPermissions;
    }


    public get owner(): FileSystemUser {
        return this._stats.owner;
    }


    public get countOfAllocatedBlocks(): number {
        return this._stats.countOfAllocatedBlocks;
    }


    public get sizeOfAllocatedBlock(): number {
        return this._stats.sizeOfAllocatedBlock;
    }


    public get hardLinksCount(): number {
        return this._stats.hardLinksCount;
    }


    protected constructor(fullName: string) {
        this._fullName = fullName;
    }


    public async refresh(): AsyncResult<void> {
        this.throwIfDisposed();
        this.throwIfRemoved();

        delete this._stats;

        this._exists = false;
        
        if (!PathModule.isAbsolute(this._fullName)) {
            this._fullName = await this._fileSystem.getAbsolutePath(this._fullName);
        }
        
        this._stats = await this._fileSystem.getStats(this.fullName);
        this._exists = true;
    }


    public async getDirectory(): AsyncResult<DirectoryInfo> {
        this.throwIfDisposed();
        this.throwIfRemoved();

        return DirectoryInfo.getInfo(this.directoryName);
    }


    public async moveTo(destinationName: string): AsyncResult<void> {
        this.throwIfDisposed();
        this.throwIfRemoved();

        if (!PathModule.isAbsolute(destinationName)) {
            destinationName = await this._fileSystem.getAbsolutePath(destinationName);
        }

        await this._fileSystem.move(this.fullName, destinationName);

        await this.refresh();
    }


    public async remove(): AsyncResult<void> {
        this.throwIfDisposed();
        this.throwIfRemoved();

        await this._fileSystem.removeFile(this.fullName);

        this._isRemoved = true;
    }


    public dispose(): void {
        this._exists = false;
        this._isDisposed = true;
        this._stats = Object.create(null);
    }


    protected throwIfDisposed(): void {
        if (this._isDisposed) {
            throw new InvalidOperationException('Object was disposed.');
        }
    }


    protected throwIfRemoved(): void {
        if (this._isRemoved) {
            throw new InvalidOperationException('Object was removed.');
        }
    }
}
