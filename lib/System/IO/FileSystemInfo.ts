import * as PathModule from 'path';
import {AsyncResult, IDisposable} from '../../Core/types';
import {AccessPermissions, IFileSystemStats} from './types';
import DirectoryInfo from './DirectoryInfo';
import FileSystem from './FileSystem';
import InvalidOperationException from '../../Core/Exceptions/InvalidOperationException';


export default class FileSystemInfo implements IFileSystemStats, IDisposable {
    public static async getInfo(fullPath: string): AsyncResult<FileSystemInfo> {
        let info: FileSystemInfo = new this(fullPath);

        await info.refresh();

        return info;
    }


    // PROTECTED PROPERTIES

    
    protected _isDisposed: boolean = false;
    protected _isRemoved: boolean = false;

    protected _fullName: string;

    protected _exists: boolean;
    protected _stats: IFileSystemStats;


    // PUBLIC GETTERS AND SETTERS
    
    
    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public get exists(): boolean {
        return this._exists;
    }


    public get isFile(): boolean {
        return this._stats.isFile;
    }


    public get isDirectory(): boolean {
        return this._stats.isDirectory;
    }


    public get isFIFO(): boolean {
        return this._stats.isFIFO;
    }


    public get isSymbolicLink(): boolean {
        return this._stats.isSymbolicLink;
    }


    public get isSocket(): boolean {
        return this._stats.isSocket;
    }


    public get isCharacterDevice(): boolean {
        return this._stats.isCharacterDevice;
    }


    public get isBlockDevice(): boolean {
        return this._stats.isBlockDevice;
    }


    public get creationTime(): Date {
        return this._stats.creationTime;
    }


    public get lastChangeTime(): Date {
        return this._stats.lastChangeTime;
    }


    public get lastAccessTime(): Date {
        return this._stats.lastAccessTime;
    }


    public get lastWriteTime(): Date {
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


    public get ownerUserId(): number {
        return this._stats.ownerUserId;
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


    public get ownerGroupId(): number {
        return this._stats.ownerGroupId;
    }


    // CONSTRUCTORS


    protected constructor(fullName: string) {
        this._fullName = fullName;
    }


    // PUBLIC METHODS


    public async refresh(): AsyncResult<void> {
        this.throwIfDisposed();
        this.throwIfRemoved();

        delete this._stats;

        this._exists = false;
        
        if (!PathModule.isAbsolute(this._fullName)) {
            this._fullName = await FileSystem.getAbsolutePath(this._fullName);
        }
        
        this._stats = await FileSystem.getStats(this.fullName);
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
            destinationName = await FileSystem.getAbsolutePath(destinationName);
        }

        await FileSystem.move(this.fullName, destinationName);

        await this.refresh();
    }


    public async remove(): AsyncResult<void> {
        this.throwIfDisposed();
        this.throwIfRemoved();

        await FileSystem.remove(this.fullName);

        this._isRemoved = true;
    }
    
    
    public dispose() {
        this._exists = false;
        this._isDisposed = true;
        this._stats = Object.create(null);
    }


    // PROTECTED METHODS


    protected throwIfDisposed() {
        if (this._isDisposed) {
            throw new InvalidOperationException('Object was disposed.');
        }
    }


    protected throwIfRemoved() {
        if (this._isRemoved) {
            throw new InvalidOperationException('Object was removed.');
        }
    }
}
