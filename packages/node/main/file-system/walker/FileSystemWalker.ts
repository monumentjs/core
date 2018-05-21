import {Path} from '../../path/Path';
import {DirectoryContent} from '../DirectoryContent';
import {FileSystemEntry} from '../FileSystemEntry';
import {FileSystemEntryProcessor} from './FileSystemEntryProcessor';
import {FileSystemWalkerConfiguration} from './FileSystemWalkerConfiguration';


export class FileSystemWalker {
    private readonly _configuration: FileSystemWalkerConfiguration;


    public constructor(configuration: FileSystemWalkerConfiguration) {
        this._configuration = configuration;
    }


    public walk(path: Path, entryProcessor: FileSystemEntryProcessor): Promise<void> {
        return this.walkInDepth(path, entryProcessor, 0);
    }


    private async walkInDepth(path: Path, entryProcessor: FileSystemEntryProcessor, level: number): Promise<void> {
        const content: DirectoryContent = await this._configuration.storage.readDirectory(path);

        if (entryProcessor.onFile) {
            for (const file of content.files) {
                if (await this.test(file)) {
                    await entryProcessor.onFile(file);
                }
            }
        }

        if (entryProcessor.onLink) {
            for (const link of content.links) {
                if (await this.test(link)) {
                    await entryProcessor.onLink(link);
                }
            }
        }

        for (const directory of content.directories) {
            if (entryProcessor.onDirectory) {
                if (await this.test(directory)) {
                    await entryProcessor.onDirectory(directory);
                }
            }

            if (level <= this._configuration.maxDepth) {
                await this.walkInDepth(directory.path, entryProcessor, level + 1);
            }
        }
    }


    private async test(entry: FileSystemEntry): Promise<boolean> {
        if (this._configuration.filters.isEmpty) {
            return true;
        }

        for (const filter of this._configuration.filters) {
            if (await filter.decide(entry)) {
                return true;
            }
        }

        return false;
    }
}
