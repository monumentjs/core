import {ArrayList} from '@monument/collections/main/ArrayList';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {Path} from '../../path/Path';
import {DirectoryContent} from '../DirectoryContent';
import {FileStorage} from '../FileStorage';
import {FileSystemEntry} from '../FileSystemEntry';
import {FileSystemEntryProcessor} from './FileSystemEntryProcessor';
import {FileSystemEntryFilter} from './FileSystemEntryFilter';


export class FileSystemWalker {
    private readonly _filters: ArrayList<FileSystemEntryFilter> = new ArrayList();
    private readonly _storage: FileStorage;
    private readonly _maxDepth: number;


    public get filters(): ReadOnlyCollection<FileSystemEntryFilter> {
        return this._filters;
    }


    public constructor(storage: FileStorage, maxDepth: number = Infinity) {
        this._storage = storage;
        this._maxDepth = maxDepth;
    }


    public addFilter(filter: FileSystemEntryFilter): void {
        this._filters.add(filter);
    }


    public walk(path: Path, entryProcessor: FileSystemEntryProcessor): Promise<void> {
        return this.walkInDepth(path, entryProcessor, 0);
    }


    private async walkInDepth(path: Path, entryProcessor: FileSystemEntryProcessor, level: number): Promise<void> {
        const content: DirectoryContent = await this._storage.readDirectory(path);

        for (const file of content.files) {
            if (await this.test(file)) {
                await entryProcessor(file);
            }
        }

        for (const directory of content.directories) {
            if (await this.test(directory)) {
                await entryProcessor(directory);
            }

            if (level <= this._maxDepth) {
                await this.walkInDepth(directory.path, entryProcessor, level + 1);
            }
        }
    }


    private async test(entry: FileSystemEntry): Promise<boolean> {
        if (this._filters.isEmpty) {
            return true;
        }

        for (const filter of this._filters) {
            if (await filter.decide(entry)) {
                return true;
            }
        }

        return false;
    }
}
