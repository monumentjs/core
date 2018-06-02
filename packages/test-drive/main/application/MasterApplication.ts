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
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
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
import {CPUInfo} from '@monument/node/main/system/info/cpu/CPUInfo';
import {RAMInfo} from '@monument/node/main/system/info/ram/RAMInfo';
import {OSInfo} from '@monument/node/main/system/info/os/OSInfo';
import {StringBuilder} from '@monument/text/main/StringBuilder';


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
    private readonly _testReporter: TestReporter;
    private readonly _testReportRegistry: TestReportRegistry;
    private readonly _logger: Logger;
    private readonly _cpu: CPUInfo;
    private readonly _ram: RAMInfo;
    private readonly _os: OSInfo;


    public constructor(
        connection: MasterConnection,
        currentProcess: CurrentProcess,
        projectScanner: ProjectScanner,
        testReporter: TestReporter,
        testReportRegistry: TestReportRegistry,
        loggerManager: LoggerManager,
        cpu: CPUInfo,
        ram: RAMInfo,
        os: OSInfo
    ) {
        this._cpu = cpu;
        this._ram = ram;
        this._os = os;
        this._logger = loggerManager.getLogger(this.constructor.name);
        this._currentProcess = currentProcess;
        this._projectScanner = projectScanner;
        this._testReporter = testReporter;
        this._connection = connection;
        this._testReportRegistry = testReportRegistry;
        this._connection.fileEnded.subscribe(this.handleFileEnded);
        this._connection.reported.subscribe(this.handleReported);
    }


    @Init
    public async run() {
        const sb = new StringBuilder();

        sb.appendLine(`System info:`);
        sb.appendLine(`CPU: ${this._cpu.coresCount} cores; ${this._cpu.architecture}`);
        sb.appendLine(`RAM: ${Math.round(this._ram.total.megabytes)}Mb`);
        sb.appendLine(`OS: ${this._os.platform}`);

        await this._logger.debug(sb.toString());

        await this._logger.info('Running tests in ' + this._currentProcess.currentWorkingDirectory.toString());
        await this._projectScanner.scan(this);

        await this._logger.info('REPORT');
        await this.printReports();

        const exitCode: number = this._testReportRegistry.hasFailedTests ? 1 : 0;

        await this._logger.debug('Exit with code: ' + exitCode);
        await this._currentProcess.exit(exitCode);
    }


    public async onFile(file: File): Promise<void> {
        await this._logger.debug('Run file ' + file.path.toString());

        const deferred: DeferredObject<void> = new DeferredObject();

        this._pendingTests.put(file.path.toString(), deferred);

        await this._connection.startFile(file.path);

        await deferred.promise;

        await this._logger.debug('End file ' + file.path.toString());
    }


    @Delegate
    private handleFileEnded(target: ChildProcess<ProcessMessages>, message: FileEndMessage): void {
        const deferred: DeferredObject<void> | undefined = this._pendingTests.remove(message.path);

        if (deferred != null) {
            deferred.resolve();
        }
    }


    @Delegate
    private handleReported(target: ChildProcess<ProcessMessages>, message: ReportMessage): void {
        this._testReportRegistry.addReport(message.report);
    }


    private async printReports() {
        for (const report of this._testReportRegistry.reports) {
            await this._testReporter.report(report);
        }
    }
}
