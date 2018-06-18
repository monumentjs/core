import {File} from '@monument/node/main/file-system/File';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {CurrentProcessModule} from '@monument/node/main/process/CurrentProcessModule';
import {LocalFileSystemModule} from '@monument/node/main/file-system/local/LocalFileSystemModule';
import {FileSystemEntryProcessor} from '@monument/node/main/file-system/walker/FileSystemEntryProcessor';
import {SystemInfoModule} from '@monument/node/main/system/info/SystemInfoModule';
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {ProjectModule} from '@monument/project/main/ProjectModule';
import {ProjectScanner} from '../project/scanner/ProjectScanner';
import {ProjectScannerModule} from '../project/ProjectScannerModule';
import {ConfigurationModule} from '../configuration/ConfigurationModule';
import {TestReporterModule} from '../reporter/TestReporterModule';
import {MasterConnection} from '../connection/MasterConnection';
import {ConnectionModule} from '../connection/ConnectionModule';
import {ProcessMessages} from '../connection/messaging/ProcessMessages';
import {FileEndMessage} from '../connection/messaging/FileEndMessage';
import {ReportMessage} from '../connection/messaging/ReportMessage';
import {Boot} from '@monument/core/main/application/decorators/Boot';
import {Application} from '@monument/core/main/stereotype/Application';
import {ListMap} from '@monument/core/main/collections/ListMap';
import {DeferredObject} from '@monument/core/main/async/DeferredObject';
import {Init} from '@monument/core/main/stereotype/lifecycle/Init';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Channel} from '@monument/node/main/process/Channel';
import {TestReporterManager} from '../reporter/TestReporterManager';


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
    private readonly _connection: MasterConnection;
    private readonly _testReporterManager: TestReporterManager;
    private readonly _logger: Logger;


    public constructor(
        connection: MasterConnection,
        currentProcess: CurrentProcess,
        projectScanner: ProjectScanner,
        testReporterManager: TestReporterManager,
        loggerManager: LoggerManager
    ) {
        this._logger = loggerManager.getLogger(this.constructor.name);
        this._currentProcess = currentProcess;
        this._projectScanner = projectScanner;
        this._connection = connection;
        this._testReporterManager = testReporterManager;
        this._connection.fileEnded.subscribe(this.handleFileEnded);
        this._connection.reported.subscribe(this.handleReported);
    }


    @Init
    public async run() {
        await this._testReporterManager.onStarted();
        await this._projectScanner.scan(this);
        await this._testReporterManager.onEnded();

        // const exitCode: number = this._testReportRegistry.hasFailedTests ? 1 : 0;

        await this._currentProcess.exit(0);
    }


    public async onFile(file: File): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._pendingTests.put(file.path.toString(), deferred);

        await this._connection.startFile(file.path);

        await deferred.promise;
    }


    @Delegate
    private handleFileEnded(target: Channel<ProcessMessages>, message: FileEndMessage): void {
        const deferred: DeferredObject<void> | undefined = this._pendingTests.remove(message.path);

        if (deferred != null) {
            deferred.resolve();
        }
    }


    @Delegate
    private async handleReported(target: Channel<ProcessMessages>, message: ReportMessage): Promise<void> {
        // await this._testReporterController.addReport(message.report);
    }
}
