import {Delegate} from '@monument/core/main/decorators/Delegate';
import {ListMap} from '@monument/collections/main/ListMap';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {Boot} from '@monument/application/main/decorators/Boot';
import {Init} from '@monument/decorators/main/stereotype/lifecycle/Init';
import {Application} from '@monument/decorators/main/stereotype/Application';
import {File} from '@monument/node/main/file-system/File';
import {ChildProcess} from '@monument/node/main/process/ChildProcess';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {CurrentProcessModule} from '@monument/node/main/process/CurrentProcessModule';
import {LocalFileSystemModule} from '@monument/node/main/file-system/local/LocalFileSystemModule';
import {FileSystemEntryProcessor} from '@monument/node/main/file-system/walker/FileSystemEntryProcessor';
import {SystemInfoModule} from '@monument/node/main/system/info/SystemInfoModule';
import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {ProjectModule} from '@monument/project/main/ProjectModule';
import {ProjectScanner} from '../project/scanner/ProjectScanner';
import {ProjectScannerModule} from '../project/ProjectScannerModule';
import {ConfigurationModule} from '../configuration/ConfigurationModule';
import {TestReporterModule} from '../reporter/TestReporterModule';
import {TestReportRegistry} from '../reporter/TestReportRegistry';
import {TestReporter} from '../reporter/TestReporter';
import {MasterConnection} from '../connection/MasterConnection';
import {ConnectionModule} from '../connection/ConnectionModule';
import {ProcessMessages} from '../connection/message/ProcessMessages';
import {FileEndMessage} from '../connection/message/FileEndMessage';
import {ReportMessage} from '../connection/message/ReportMessage';


@Boot
@Application({
    modules: [
        LoggerModule,
        CurrentProcessModule,
        LocalFileSystemModule,
        ConnectionModule,
        ProjectModule,
        ProjectScannerModule,
        TestReporterModule,
        ConfigurationModule,
        SystemInfoModule
    ]
})
export class MasterApplication implements FileSystemEntryProcessor {
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
        await this._projectScanner.scan(this);

        await this.printReports();

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
    private onReported(target: ChildProcess<ProcessMessages>, message: ReportMessage): void {
        this._testReportRegistry.addReport(message.report);
    }


    private async printReports() {
        for (const report of this._testReportRegistry.reports) {
            await this._testReporter.report(report);
        }
    }
}
