import {Type} from '@monument/core/main/Type';
import {ClassLoader} from '@monument/core/main/ClassLoader';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Boot} from '@monument/application/main/decorators/Boot';
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {Application} from '@monument/stereotype/main/Application';
import {CurrentProcess} from '@monument/node/main/process/CurrentProcess';
import {ProcessMessage} from '@monument/node/main/process/ProcessMessage';
import {ProcessMessageReceivedEventArgs} from '@monument/node/main/process/ProcessMessageReceivedEventArgs';
import {CurrentProcessModule} from '@monument/node/main/process/CurrentProcessModule';
import {LocalFileSystemModule} from '@monument/node/main/file-system/local/LocalFileSystemModule';
import {Path} from '@monument/node/main/path/Path';
import {Class} from '@monument/reflection/main/Class';
import {ConfigurationModule} from '../modules/configuration/ConfigurationModule';
import {TestCommand} from '../modules/reporter/TestCommand';
import {TestFileReport} from '../modules/reporter/TestFileReport';
import {AssertionModule} from '../modules/assert/AssertionModule';
import {TestRunner} from '../modules/runner/TestRunner';
import {TestRunnerModule} from '../modules/runner/TestRunnerModule';
import {MessageType} from './communication/MessageType';
import {ProcessMessages} from './communication/ProcessMessages';
import {Connection} from './communication/Connection';


@Boot
@Application({
    modules: [
        LoggerModule,
        CurrentProcessModule,
        LocalFileSystemModule,
        AssertionModule,
        TestRunnerModule,
        ConfigurationModule
    ]
})
export class SlaveApplication {
    private readonly _classLoader: ClassLoader = new ClassLoader();
    private readonly _currentProcess: CurrentProcess;
    private readonly _testRunner: TestRunner;
    private readonly _logger: Logger;
    private readonly _connection: Connection;


    public constructor(process: CurrentProcess, testRunner: TestRunner, loggerManager: LoggerManager) {
        this._logger = loggerManager.getLogger(this.constructor.name);
        this._currentProcess = process;
        this._testRunner = testRunner;
        this._currentProcess.messageReceived.subscribe(this.onMessageReceived);
        this._connection = new Connection(this._currentProcess);
    }


    @Delegate
    private async onMessageReceived(target: CurrentProcess, args: ProcessMessageReceivedEventArgs<ProcessMessages>) {
        const message: ProcessMessage<ProcessMessages> = args.message;

        await this._logger.debug('Message received ' + JSON.stringify(message));

        switch (message.payload.type) {
            case MessageType.FILE_START:
                await this.onFileStart(message.payload.path);

                break;

            default:
        }
    }


    private async onFileStart(filePath: string): Promise<void> {
        const path: Path = new Path(filePath);
        const testClass: Class<object> | undefined = await this.loadTestClass(path);

        if (testClass != null) {
            const report: TestFileReport = await this.runTestFile(path, testClass);
            await this.reportBack(path, report);
            await this.endTestFile(path);
        }
    }


    private runTestFile(path: Path, testClass: Class<object>): Promise<TestFileReport> {
        const testCommand: TestCommand = new TestCommand(path, testClass);

        return this._testRunner.run(testCommand);
    }


    private async endTestFile(path: Path): Promise<void> {
        await this._logger.debug('File ending ' + path);

        await this._connection.endFile(path);

        await this._logger.debug('File ended ' + path);
    }


    private async reportBack(path: Path, report: TestFileReport): Promise<void> {
        await this._logger.debug('Report back ' + path);

        await this._connection.report(path, report);

        await this._logger.debug('Report sent ' + path);
    }


    private async loadTestClass(path: Path): Promise<Class<object> | undefined> {
        try {
            const testConstructor: Type<object> = await this._classLoader.load(
                path.toString(),
                path.baseNameWithoutExtension
            );

            return Class.of(testConstructor);
        } catch (e) {
            await this._logger.error('Error loading test class', e);
        }

        return undefined;
    }
}
