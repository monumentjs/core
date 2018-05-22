import {Delegate} from '@monument/core/main/decorators/Delegate';
import {ListMap} from '@monument/collections/main/ListMap';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {Boot} from '@monument/application/main/decorators/Boot';
import {Init} from '@monument/stereotype/main/Init';
import {Application} from '@monument/stereotype/main/Application';
import {Path} from '@monument/node/main/path/Path';
import {File} from '@monument/node/main/file-system/File';
import {ChildProcess} from '@monument/node/main/process/ChildProcess';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {CurrentProcessModule} from '@monument/node/main/process/CurrentProcessModule';
import {LocalFileSystemModule} from '@monument/node/main/file-system/local/LocalFileSystemModule';
import {FileSystemEntryProcessor} from '@monument/node/main/file-system/walker/FileSystemEntryProcessor';
import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {ProjectModule} from '../project/ProjectModule';
import {ProjectScanner} from '../project/scanner/ProjectScanner';
import {ConfigurationModule} from '../configuration/ConfigurationModule';
import {TestReporterModule} from '../reporter/TestReporterModule';
import {TestReporter} from '../reporter/TestReporter';
import {MasterConnection} from '../connection/MasterConnection';
import {ProcessMessages} from '../connection/message/ProcessMessages';
import {FileEndMessage} from '../connection/message/FileEndMessage';
import {ReportMessage} from '../connection/message/ReportMessage';
import {ConnectionModule} from '../connection/ConnectionModule';
import {TestReportRegistry} from '../reporter/TestReportRegistry';


@Boot
@Application({
    modules: [
        LoggerModule,
        CurrentProcessModule,
        LocalFileSystemModule,
        ConnectionModule,
        ProjectModule,
        TestReporterModule,
        ConfigurationModule
    ]
})
export class MasterApplication implements FileSystemEntryProcessor {
    private static readonly TEST_DIRECTORY: Path = new Path('./test');

    private readonly _currentProcess: CurrentProcess;
    private readonly _projectScanner: ProjectScanner;
    private readonly _pendingTests: ListMap<string, DeferredObject<void>> = new ListMap();
    private readonly _connection: MasterConnection;
    private readonly _testReporter: TestReporter;
    private readonly _testReportRegistry: TestReportRegistry;


    public constructor(
        connection: MasterConnection,
        currentProcess: CurrentProcess,
        projectScanner: ProjectScanner,
        testReporter: TestReporter,
        testReportRegistry: TestReportRegistry
    ) {
        this._currentProcess = currentProcess;
        this._projectScanner = projectScanner;
        this._testReporter = testReporter;
        this._connection = connection;
        this._testReportRegistry = testReportRegistry;
        this._connection.fileEnded.subscribe(this.onFileEnded);
        this._connection.reported.subscribe(this.onReported);
    }


    @Init
    public async run() {
        const path: Path = this._currentProcess.currentWorkingDirectory.resolve(MasterApplication.TEST_DIRECTORY);

        await this._projectScanner.scan(path, this);

        await this._currentProcess.exit(this._testReportRegistry.hasFailedTests ? 1 : 0);
    }


    public async onFile(file: File): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._pendingTests.put(file.path.toString(), deferred);

        await this._connection.startFile(file.path);

        return deferred.promise;
    }


    @Delegate
    private onFileEnded(target: ChildProcess<ProcessMessages>, message: FileEndMessage): void {
        const deferred: DeferredObject<void> | undefined = this._pendingTests.remove(message.path);

        if (deferred != null) {
            deferred.resolve();
        }
    }


    @Delegate
    private onReported(target: ChildProcess<ProcessMessages>, message: ReportMessage): Promise<void> {
        this._testReportRegistry.addReport(message.report);

        return this._testReporter.report(message.report);
    }
}
