import {cpus} from 'os';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {ListMap} from '@monument/collections/main/ListMap';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {Boot} from '@monument/application/main/decorators/Boot';
import {Init} from '@monument/stereotype/main/Init';
import {Path} from '@monument/node/main/path/Path';
import {File} from '@monument/node/main/file-system/File';
import {ForkPool} from '@monument/node/main/process/ForkPool';
import {ChildProcess} from '@monument/node/main/process/ChildProcess';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {ProcessMessage} from '@monument/node/main/process/ProcessMessage';
import {ProcessMessageReceivedEventArgs} from '@monument/node/main/process/ProcessMessageReceivedEventArgs';
import {CurrentProcessModule} from '@monument/node/main/process/CurrentProcessModule';
import {ProjectModule} from '../modules/project/ProjectModule';
import {ProjectScanner} from '../modules/project/scanner/ProjectScanner';
import {ConfigurationModule} from '../modules/configuration/ConfigurationModule';
import {MessageType} from './communication/MessageType';
import {SerializedTestReport} from '../modules/reporter/SerializedTestReport';
import {TestReporterModule} from '../modules/reporter/TestReporterModule';
import {TestReporter} from '../modules/reporter/TestReporter';
import {TestFileReport} from '../modules/reporter/TestFileReport';
import {Application} from '@monument/stereotype/main/Application';
import {FileSystemEntryProcessor} from '@monument/node/main/file-system/walker/FileSystemEntryProcessor';
import {LocalFileSystemModule} from '@monument/node/main/file-system/local/LocalFileSystemModule';
import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {ProcessMessages} from './communication/ProcessMessages';
import {Connection} from './communication/Connection';


@Boot
@Application({
    modules: [
        LoggerModule,
        CurrentProcessModule,
        LocalFileSystemModule,
        ProjectModule,
        TestReporterModule,
        ConfigurationModule
    ]
})
export class MasterApplication implements FileSystemEntryProcessor {
    private static readonly SLAVE_APPLICATION_EXECUTABLE: Path = Path.resolve([
        new Path(__dirname),
        new Path('./SlaveApplication')
    ]);
    private static readonly TEST_DIRECTORY: Path = new Path('./test');

    private readonly _currentProcess: CurrentProcess;
    private readonly _projectScanner: ProjectScanner;
    private readonly _forkPool: ForkPool<ProcessMessages> = new ForkPool(cpus().length, MasterApplication.SLAVE_APPLICATION_EXECUTABLE);
    private readonly _pendingTests: ListMap<string, DeferredObject<void>> = new ListMap();
    private readonly _testReporter: TestReporter;
    private readonly _connection: Connection;


    public constructor(
        currentProcess: CurrentProcess,
        projectScanner: ProjectScanner,
        testReporter: TestReporter
    ) {
        this._currentProcess = currentProcess;
        this._projectScanner = projectScanner;
        this._testReporter = testReporter;
        this._forkPool.messageReceived.subscribe(this.onMessageReceived);
        this._connection = new Connection(this._forkPool);
    }


    @Init
    public async run() {
        const path: Path = this._currentProcess.currentWorkingDirectory.resolve(MasterApplication.TEST_DIRECTORY);

        await this._projectScanner.scan(path, this);

        await this._currentProcess.exit(0);
    }


    @Delegate
    public async onFile(file: File): Promise<void> {
        return this.runTestFile(file);
    }


    @Delegate
    private async onMessageReceived(target: ChildProcess<ProcessMessages>, args: ProcessMessageReceivedEventArgs<ProcessMessages>) {
        const message: ProcessMessage<ProcessMessages> = args.message;

        switch (message.payload.type) {
            case MessageType.FILE_END:
                await this.onFileEnd(message.payload.path);
                break;

            case MessageType.REPORT:
                await this.onReport(message.payload.report);
                break;

            default:
        }
    }


    private async onReport(report: SerializedTestReport): Promise<void> {
        await this._testReporter.report(TestFileReport.fromJSON(report));
    }


    private async onFileEnd(path: string): Promise<void> {
        this.endTestFile(path);
    }


    private async runTestFile(file: File) {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._pendingTests.put(file.path.toString(), deferred);

        await this._connection.startFile(file.path);

        return deferred.promise;
    }


    private endTestFile(filePath: string) {
        const deferred: DeferredObject<void> | undefined = this._pendingTests.remove(filePath);

        if (deferred != null) {
            deferred.resolve();
        }
    }
}
