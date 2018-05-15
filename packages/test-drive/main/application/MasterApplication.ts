import {cpus} from 'os';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {ListMap} from '@monument/collections/main/ListMap';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {Boot} from '@monument/application/main/decorators/Boot';
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {Init} from '@monument/stereotype/main/Init';
import {NodeApplication} from '@monument/node/main/application/decorators/NodeApplication';
import {Path} from '@monument/node/main/path/Path';
import {File} from '@monument/node/main/file-system/File';
import {ForkPool} from '@monument/node/main/process/ForkPool';
import {ChildProcess} from '@monument/node/main/process/ChildProcess';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {ProcessMessage} from '@monument/node/main/process/ProcessMessage';
import {ProcessMessageReceivedEventArgs} from '@monument/node/main/process/ProcessMessageReceivedEventArgs';
import {ProjectModule} from '../modules/project/ProjectModule';
import {ProjectScanner} from '../modules/project/scanner/ProjectScanner';
import {LoggerConfigurationModule} from '../modules/logger/LoggerConfigurationModule';
import {ClusterMessageType} from './communication/ClusterMessageType';
import {RunTestFileRequestClusterMessage} from './communication/RunTestFileRequestClusterMessage';


@Boot
@NodeApplication({
    modules: [
        ProjectModule,
        LoggerConfigurationModule
    ]
})
export class MasterApplication {
    private static readonly SLAVE_APPLICATION_EXECUTABLE: Path = Path.resolve([
        new Path(__dirname),
        new Path('./SlaveApplication')
    ]);

    private readonly _currentProcess: CurrentProcess;
    private readonly _projectScanner: ProjectScanner;
    private readonly _forkPool: ForkPool = new ForkPool(cpus().length, MasterApplication.SLAVE_APPLICATION_EXECUTABLE);
    private readonly _pendingTests: ListMap<string, DeferredObject<void>> = new ListMap();
    private readonly _logger: Logger;


    public constructor(
        currentProcess: CurrentProcess,
        projectScanner: ProjectScanner,
        loggerManager: LoggerManager
    ) {
        this._currentProcess = currentProcess;
        this._projectScanner = projectScanner;
        this._forkPool.messageReceived.subscribe(this.onMessageReceived);
        this._logger = loggerManager.getLogger('Master');
    }


    @Init
    public async run() {
        await this._logger.info('Running tests...');

        const path: Path = this._currentProcess.currentWorkingDirectory.resolve(new Path('./test'));

        await this._projectScanner.scan(path, this.onTestFile);

        await this._currentProcess.exit(0);
    }


    @Delegate
    private onTestFile(file: File): Promise<void> {
        return this.runTestFile(file);
    }


    @Delegate
    private onMessageReceived(target: ChildProcess, args: ProcessMessageReceivedEventArgs) {
        const message: ProcessMessage = args.message;

        switch (message.payload.type) {
            case ClusterMessageType.RUN_TEST_FILE_RESPONSE:
                this.endTestFile(message.payload.filePath);
                break;

            default:
        }
    }


    private async runTestFile(file: File) {
        const deferred: DeferredObject<void> = new DeferredObject();
        const message: RunTestFileRequestClusterMessage = {
            type: ClusterMessageType.RUN_TEST_FILE_REQUEST,
            filePath: file.path.toString()
        };

        this._pendingTests.put(file.path.toString(), deferred);

        await this._forkPool.send(new ProcessMessage(message));

        return deferred.promise;
    }


    private endTestFile(filePath: string) {
        const deferred: DeferredObject<void> | undefined = this._pendingTests.remove(filePath);

        if (deferred != null) {
            deferred.resolve();
        }
    }
}
