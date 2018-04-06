import {ReadOnlyCollection} from '../../collections/main/ReadOnlyCollection';
import {List} from '../../collections/main/List';
import {ArrayList} from '../../collections/main/ArrayList';
import {Path} from './Path';
import {PathPattern} from './PathPattern';
import {FileSystemEntry} from './FileSystemEntry';
import {FileSystemEntryProcessor, FileSystemEntrySelector} from './types';
import {FileSystemWalkerContext} from './FileSystemWalkerContext';
import {FileSystemEntryType} from './FileSystemEntryType';
import {FileStorage} from './FileStorage';


export class FileSystemWalker {
    private _depth: number = Infinity;
    private _pathPatterns: List<PathPattern> = new ArrayList<PathPattern>();
    private _entrySelectors: List<FileSystemEntrySelector> = new ArrayList<FileSystemEntrySelector>();
    private _storage: FileStorage;


    public get depth(): number {
        return this._depth;
    }


    public set depth(value: number) {
        this._depth = value;
    }


    public constructor(storage: FileStorage) {
        this._storage = storage;
    }


    public addPathPattern(pattern: PathPattern): void {
        this._pathPatterns.add(pattern);
    }


    public addEntrySelector(entrySelector: FileSystemEntrySelector): void {
        this._entrySelectors.add(entrySelector);
    }


    public async walk(startDirectory: string, entryProcessor: FileSystemEntryProcessor): Promise<void> {
        if (!Path.isAbsolute(startDirectory)) {
            startDirectory = await this._storage.getAbsolutePath(startDirectory);
        }

        let context: FileSystemWalkerContext = new FileSystemWalkerContext(startDirectory, entryProcessor);

        return this.processDirectory(context);
    }


    private async processDirectory(context: FileSystemWalkerContext): Promise<void> {
        let currentDirectory: string = context.currentDirectory;
        let entries: ReadOnlyCollection<FileSystemEntry> = await this._storage.readDirectory(currentDirectory);

        for (let entry of entries) {
            await this.processEntry(entry, context);

            if (context.isCancelled) {
                break;
            }

            if (context.currentLevel >= this.depth) {
                continue;
            }

            if (entry.entryType === FileSystemEntryType.Directory) {
                context.currentDirectory = entry.path;
                context.currentLevel++;

                await this.processDirectory(context);

                context.currentLevel--;
            }
        }
    }


    private async processEntry(entry: FileSystemEntry, context: FileSystemWalkerContext): Promise<void> {
        if (!this.entryMatchesPathPatterns(entry)) {
            return;
        }

        if (!this.entryMatchesSelectors(entry)) {
            return;
        }

        await context.processEntry(entry);
    }


    private entryMatchesPathPatterns(entry: FileSystemEntry): boolean {
        if (this._pathPatterns.length === 0) {
            return true;
        }

        return this._pathPatterns.any((pattern: PathPattern): boolean => {
            return pattern.test(entry.path);
        });
    }


    private entryMatchesSelectors(entry: FileSystemEntry): boolean {
        if (this._entrySelectors.length === 0) {
            return true;
        }

        return this._entrySelectors.any((entrySelector: FileSystemEntrySelector): boolean => {
            return entrySelector(entry);
        });
    }
}
