import {Type} from '@monument/core/main/Type';
import {ClassLoader} from '@monument/core/main/ClassLoader';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Boot} from '@monument/application/main/decorators/Boot';
import {NodeApplication} from '@monument/node/main/application/decorators/NodeApplication';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {ProcessMessage} from '@monument/node/main/process/ProcessMessage';
import {LocalFileSystem} from '@monument/node/main/file-system/local/LocalFileSystem';
import {ProcessMessageReceivedEventArgs} from '@monument/node/main/process/ProcessMessageReceivedEventArgs';
import {Path} from '@monument/node/main/path/Path';
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {LoggerConfigurationModule} from '../modules/logger/LoggerConfigurationModule';
import {AssertionModule} from '../modules/assert/AssertionModule';
import {TestRunnerModule} from '../modules/runner/TestRunnerModule';
import {TestRunner} from '../modules/runner/TestRunner';
import {ClusterMessageType} from './communication/ClusterMessageType';
import {RunTestFileResponseClusterMessage} from './communication/RunTestFileResponseClusterMessage';


@Boot
@NodeApplication({
    components: [
        LocalFileSystem
    ],
    modules: [
        AssertionModule,
        TestRunnerModule,
        LoggerConfigurationModule
    ]
})
export class SlaveApplication {
    private readonly _classLoader: ClassLoader = new ClassLoader();
    private readonly _process: CurrentProcess;
    private readonly _runner: TestRunner;
    private readonly _logger: Logger;


    public constructor(process: CurrentProcess, runner: TestRunner, loggerManager: LoggerManager) {
        this._process = process;
        this._runner = runner;
        this._process.messageReceived.subscribe(this.onMessageReceived);
        this._logger = loggerManager.getLogger(this.constructor.name);
    }


    @Delegate
    private async onMessageReceived(target: CurrentProcess, args: ProcessMessageReceivedEventArgs) {
        const message: ProcessMessage = args.message;

        switch (message.payload.type) {
            case ClusterMessageType.RUN_TEST_FILE_REQUEST:
                await this.runTestFile(message.payload.filePath);
                await this.endTestFile(message.payload.filePath);
                break;

            default:
        }
    }


    private async runTestFile(filePath: string): Promise<void> {
        const path: Path = new Path(filePath);

        try {
            const constructor: Type<object> = await this._classLoader.load(path.toString(), path.baseNameWithoutExtension);

            await this._runner.run(constructor);
        } catch (e) {
            await this._logger.error(e.message, e);
        }
    }


    private async endTestFile(filePath: string): Promise<void> {
        const message: RunTestFileResponseClusterMessage = {
            type: ClusterMessageType.RUN_TEST_FILE_RESPONSE,
            filePath: filePath
        };

        return this._process.send(new ProcessMessage(message));
    }
}
