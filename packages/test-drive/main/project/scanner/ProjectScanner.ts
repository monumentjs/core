import {Path} from '@monument/node/main/path/Path';
import {LocalFileSystem} from '@monument/node/main/file-system/local/LocalFileSystem';
import {FileSystemWalker} from '@monument/node/main/file-system/walker/FileSystemWalker';
import {FileSystemEntryProcessor} from '@monument/node/main/file-system/walker/FileSystemEntryProcessor';
import {FileSystemWalkerConfiguration} from '@monument/node/main/file-system/walker/FileSystemWalkerConfiguration';
import {TestFileFilter} from './TestFileFilter';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {PackageLayout} from '@monument/project/main/layout/PackageLayout';
import {Component} from '@monument/core/main/stereotype/Component';


@Component
export class ProjectScanner {
    private readonly _testDirectory: Path;
    private readonly _fileSystem: LocalFileSystem;
    private readonly _walker: FileSystemWalker;
    private readonly _packageLayout: PackageLayout;


    public constructor(
        currentProcess: CurrentProcess,
        localFileSystem: LocalFileSystem,
        testFileFilter: TestFileFilter,
        packageLayout: PackageLayout
    ) {
        this._testDirectory = currentProcess.currentWorkingDirectory.resolve(packageLayout.testDirectory);
        this._fileSystem = localFileSystem;
        this._packageLayout = packageLayout;
        this._walker = new FileSystemWalker(
            new FileSystemWalkerConfiguration(
                localFileSystem,
                [testFileFilter]
            )
        );
    }


    public async scan(processor: FileSystemEntryProcessor): Promise<void> {
        if (await this._fileSystem.directoryExists(this._testDirectory)) {
            await this._walker.walk(this._testDirectory, processor);
        }
    }
}
