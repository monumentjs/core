import {FileStorage} from '../FileStorage';
import {FileSystemEntryFilter} from '../filter/FileSystemEntryFilter';
import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';
import {ArrayList} from '@monument/core/main/collection/mutable/ArrayList';


export class FileSystemWalkerConfiguration {
    private readonly _storage: FileStorage;
    private readonly _filters: ReadOnlyList<FileSystemEntryFilter>;
    private readonly _maxDepth: number;


    public get storage(): FileStorage {
        return this._storage;
    }


    public get filters(): ReadOnlyList<FileSystemEntryFilter> {
        return this._filters;
    }


    public get maxDepth(): number {
        return this._maxDepth;
    }


    public constructor(storage: FileStorage, filters: Iterable<FileSystemEntryFilter> = [], maxDepth: number = Infinity) {
        this._storage = storage;
        this._filters = new ArrayList(filters);
        this._maxDepth = maxDepth;
    }
}
