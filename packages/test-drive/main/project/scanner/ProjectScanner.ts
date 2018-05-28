import {Component} from '@monument/decorators/main/stereotype/Component';
import {Path} from '@monument/node/main/path/Path';
import {LocalFileSystem} from '@monument/node/main/file-system/local/LocalFileSystem';
import {FileSystemWalker} from '@monument/node/main/file-system/walker/FileSystemWalker';
import {FileSystemEntryFilter} from '@monument/node/main/file-system/walker/FileSystemEntryFilter';
import {FileSystemEntryProcessor} from '@monument/node/main/file-system/walker/FileSystemEntryProcessor';
import {FileSystemWalkerConfiguration} from '@monument/node/main/file-system/walker/FileSystemWalkerConfiguration';
import {TestFileFilter} from './TestFileFilter';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {PackageLayout} from '@monument/project/main/layout/PackageLayout';


@Component
export class ProjectScanner {
    private readonly _currentProcess: CurrentProcess;
    private readonly _fileSystem: LocalFileSystem;
    private readonly _fileFilter: FileSystemEntryFilter;
    private readonly _configuration: FileSystemWalkerConfiguration;
    private readonly _walker: FileSystemWalker;
    private readonly _packageLayout: PackageLayout;


    public constructor(
        currentProcess: CurrentProcess,
        fileSystem: LocalFileSystem,
        fileFilter: TestFileFilter,
        packageLayout: PackageLayout
    ) {
        this._currentProcess = currentProcess;
        this._fileSystem = fileSystem;
        this._fileFilter = fileFilter;
        this._packageLayout = packageLayout;
        this._configuration = new FileSystemWalkerConfiguration(
            this._fileSystem, [this._fileFilter]
        );
        this._walker = new FileSystemWalker(this._configuration);
    }


    public async scan(processor: FileSystemEntryProcessor): Promise<void> {
        const currentWorkingDirectory: Path = this._currentProcess.currentWorkingDirectory;
        const testDirectory: Path = currentWorkingDirectory.resolve(this._packageLayout.testDirectory);

        if (await this._fileSystem.directoryExists(testDirectory)) {
            await this._walker.walk(testDirectory, processor);
        }
    }
}
