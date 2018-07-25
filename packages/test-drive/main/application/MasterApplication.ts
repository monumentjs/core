import {File} from '@monument/node/main/file-system/File';
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
import {MasterProcessController} from '../connection/MasterProcessController';
import {ConnectionModule} from '../connection/ConnectionModule';
import {ProcessMessages} from '../connection/messaging/ProcessMessages';
import {TestFileEndedMessage} from '../connection/messaging/TestFileEndedMessage';
import {Boot} from '@monument/core/main/application/decorators/Boot';
import {Application} from '@monument/core/main/stereotype/Application';
import {ListMap} from '@monument/core/main/collection/ListMap';
import {DeferredObject} from '@monument/core/main/async/DeferredObject';
import {Init} from '@monument/core/main/stereotype/lifecycle/Init';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Channel} from '@monument/node/main/process/Channel';
import {TestReporterManager} from '../reporter/TestReporterManager';
import {TestReportSummaryBuilder} from '../reporter/TestReportSummaryBuilder';
import {TestReportSummary} from '../reporter/TestReportSummary';
import {Path} from '@monument/node/main/path/Path';
import {ForkPool} from '@monument/node/main/process/ForkPool';
import {CPUInfo} from '@monument/node/main/system/info/cpu/CPUInfo';


@Boot
@Application({
    modules: [
        LoggerModule,
        CurrentProcessModule,
        LocalFileSystemModule,
        SystemInfoModule,

        ConnectionModule,
        ProjectModule,
        ProjectScannerModule,
        TestReporterModule,
        ConfigurationModule
    ]
})
export class MasterApplication implements FileSystemEntryProcessor {

    private readonly _currentProcess: CurrentProcess;
    private readonly _projectScanner: ProjectScanner;
    private readonly _pendingTests: ListMap<string, DeferredObject<void>> = new ListMap();
    private readonly _testReporterManager: TestReporterManager;
    private readonly _summaryBuilder: TestReportSummaryBuilder;


    public constructor(
        currentProcess: CurrentProcess,
        projectScanner: ProjectScanner,
        testReporterManager: TestReporterManager,
        summaryBuilder: TestReportSummaryBuilder
    ) {
        this._summaryBuilder = summaryBuilder;
        this._currentProcess = currentProcess;
        this._projectScanner = projectScanner;
        this._testReporterManager = testReporterManager;

    }


    @Init
    public async run() {
        await this._testReporterManager.onStarted();
        await this._projectScanner.scan(this);
        await this._testReporterManager.onEnded();

        const summary: TestReportSummary = this._summaryBuilder.build();

        const exitCode: number = summary.failedTestsCount > 0 ? 1 : 0;

        await this._currentProcess.exit(exitCode);
    }


    public async onFile(file: File): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._pendingTests.put(file.path.toString(), deferred);

        await this._connection.startFile(file.path);

        await deferred.promise;
    }


    @Delegate
    private handleFileEnded(target: Channel<ProcessMessages>, message: TestFileEndedMessage): void {
        const deferred: DeferredObject<void> | undefined = this._pendingTests.remove(message.path);

        if (deferred != null) {
            deferred.resolve();
        }
    }


    @Delegate
    private handleReported(target: Channel<ProcessMessages>, message: ReportMessage): void {
        this._summaryBuilder.analyze(message.report);
    }
}
