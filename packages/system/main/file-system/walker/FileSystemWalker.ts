import {ArrayList} from '@monument/collections/main/ArrayList';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {FileStorage} from '../FileStorage';
import {LocalFileSystem} from '../LocalFileSystem';
import {FileSystemEntry} from '../FileSystemEntry';
import {DirectoryInfo} from '../DirectoryInfo';
import {FileSystemEntryProcessor} from './FileSystemEntryProcessor';
import {FileSystemEntryFilter} from './FileSystemEntryFilter';


export class FileSystemWalker {
    private readonly _filters: ArrayList<FileSystemEntryFilter> = new ArrayList();
    private readonly _storage: FileStorage;
    private readonly _maxDepth: number;


    public get filters(): ReadOnlyCollection<FileSystemEntryFilter> {
        return this._filters;
    }


    public constructor(storage: FileStorage = LocalFileSystem.instance, maxDepth: number = Infinity) {
        this._storage = storage;
        this._maxDepth = maxDepth;
    }


    public addFilter(filter: FileSystemEntryFilter): void {
        this._filters.add(filter);
    }


    public walk(directory: string, entryProcessor: FileSystemEntryProcessor): Promise<void> {
        return this.walkInDepth(directory, entryProcessor, 0);
    }


    public async walkInDepth(directory: string, entryProcessor: FileSystemEntryProcessor, level: number): Promise<void> {
        const entries: ReadOnlyCollection<FileSystemEntry> = await this._storage.readDirectory(directory);

        for (const entry of entries) {
            if (await this.test(entry)) {
                await entryProcessor(entry);
            }

            // Check is required.
            // noinspection SuspiciousInstanceOfGuard
            if (level <= this._maxDepth && entry instanceof DirectoryInfo) {
                await this.walkInDepth(entry.path.originalPath, entryProcessor, level + 1);
            }
        }
    }


    private async test(entry: FileSystemEntry): Promise<boolean> {
        if (this._filters.isEmpty) {
            return true;
        }

        for (const filter of this._filters) {
            if (await filter.apply(entry)) {
                return true;
            }
        }

        return false;
    }
}
