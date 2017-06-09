import {FileSystemEntry} from './FileSystemEntry';
import {FileStorage} from './FileStorage';
import {Path} from './Path';
import {ReadOnlyCollection} from '../../Core/Collections/ReadOnlyCollection';
import {List} from '../../Core/Collections/List';
import {PathPattern} from './PathPattern';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {FileSystemEntryProcessor, FileSystemEntrySelector} from './types';
import {InvalidArgumentException} from '../../Core/Exceptions/InvalidArgumentException';
import {FileSystemWalkerContext} from './FileSystemWalkerContext';
import {FileSystemEntryType} from './FileSystemEntryType';


export class FileSystemWalker {
    private _depth: number = 1;
    private _pathPatterns: List<PathPattern> = new List<PathPattern>();
    private _entrySelectors: List<FileSystemEntrySelector> = new List<FileSystemEntrySelector>();


    public get depth(): number {
        return this._depth;
    }


    public set depth(value: number) {
        assertArgumentNotNull('value', value);

        if (value < 1) {
            throw new InvalidArgumentException(`Search depth cannot be less than 1.`);
        }

        this._depth = value;
    }


    public addPathPattern(pattern: PathPattern): void {
        this._pathPatterns.add(pattern);
    }


    public addEntrySelector(entrySelector: FileSystemEntrySelector): void {
        this._entrySelectors.add(entrySelector);
    }


    public async walk(startDirectory: string, entryProcessor: FileSystemEntryProcessor): Promise<void> {
        assertArgumentNotNull('startDirectory', startDirectory);
        assertArgumentNotNull('entryProcessor', entryProcessor);

        if (!Path.isAbsolute(startDirectory)) {
            startDirectory = await FileStorage.getAbsolutePath(startDirectory);
        }

        let context: FileSystemWalkerContext = new FileSystemWalkerContext(startDirectory, entryProcessor);

        return this.processDirectory(context);
    }


    private async processDirectory(context: FileSystemWalkerContext): Promise<void> {
        let currentDirectory: string = context.currentDirectory;
        let entries: ReadOnlyCollection<FileSystemEntry> = await FileStorage.readDirectory(currentDirectory);

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
                context.currentLevel += 1;

                await this.processDirectory(context);

                context.currentLevel -= 1;
            }
        }
    }


    private async processEntry(entry: FileSystemEntry, context: FileSystemWalkerContext): Promise<void> {
        if (!this.entryPathMatchesPatterns(entry)) {
            return;
        }

        if (!this.entryMatchesSelectors(entry)) {
            return;
        }

        await context.processEntry(entry);
    }


    private entryPathMatchesPatterns(entry: FileSystemEntry): boolean {
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
