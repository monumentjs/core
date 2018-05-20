import {Component} from '@monument/stereotype/main/Component';
import {Path} from '@monument/node/main/path/Path';
import {LocalFileSystem} from '@monument/node/main/file-system/local/LocalFileSystem';
import {FileSystemWalker} from '@monument/node/main/file-system/walker/FileSystemWalker';
import {FileSystemEntryFilter} from '@monument/node/main/file-system/walker/FileSystemEntryFilter';
import {FileSystemEntryProcessor} from '@monument/node/main/file-system/walker/FileSystemEntryProcessor';
import {FileSystemWalkerConfiguration} from '@monument/node/main/file-system/walker/FileSystemWalkerConfiguration';
import {TestFileFilter} from './TestFileFilter';


@Component
export class ProjectScanner {
    private readonly _fileSystem: LocalFileSystem;
    private readonly _fileFilter: FileSystemEntryFilter;
    private readonly _configuration: FileSystemWalkerConfiguration;
    private readonly _walker: FileSystemWalker;


    public constructor(fileSystem: LocalFileSystem, fileFilter: TestFileFilter) {
        this._fileSystem = fileSystem;
        this._fileFilter = fileFilter;
        this._configuration = new FileSystemWalkerConfiguration(
            this._fileSystem, [this._fileFilter]
        );
        this._walker = new FileSystemWalker(this._configuration);
    }


    public scan(path: Path, processor: FileSystemEntryProcessor): Promise<void> {
        return this._walker.walk(path, processor);
    }
}
