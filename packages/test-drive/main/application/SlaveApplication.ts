import {Type} from '@monument/core/main/Type';
import {ClassLoader} from '@monument/core/main/ClassLoader';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Boot} from '@monument/application/main/decorators/Boot';
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {Application} from '@monument/decorators/main/stereotype/Application';
import {CurrentProcessModule} from '@monument/node/main/process/CurrentProcessModule';
import {LocalFileSystemModule} from '@monument/node/main/file-system/local/LocalFileSystemModule';
import {Path} from '@monument/node/main/path/Path';
import {Channel} from '@monument/node/main/process/Channel';
import {Class} from '@monument/reflection/main/Class';
import {ConfigurationModule} from '../configuration/ConfigurationModule';
import {TestCommand} from '../reporter/TestCommand';
import {AssertionModule} from '../assert/AssertionModule';
import {TestRunner} from '../runner/TestRunner';
import {TestRunnerModule} from '../runner/TestRunnerModule';
import {ProcessMessages} from '../connection/message/ProcessMessages';
import {SlaveConnection} from '../connection/SlaveConnection';
import {FileStartMessage} from '../connection/message/FileStartMessage';
import {ConnectionModule} from '../connection/ConnectionModule';


@Boot
@Application({
    modules: [
        LoggerModule,
        CurrentProcessModule,
        LocalFileSystemModule,
        ConnectionModule,
        AssertionModule,
        TestRunnerModule,
        ConfigurationModule
    ]
})
export class SlaveApplication {
    private readonly _classLoader: ClassLoader = new ClassLoader();
    private readonly _testRunner: TestRunner;
    private readonly _logger: Logger;
    private readonly _connection: SlaveConnection;


    public constructor(connection: SlaveConnection, testRunner: TestRunner, loggerManager: LoggerManager) {
        this._logger = loggerManager.getLogger(this.constructor.name);
        this._testRunner = testRunner;
        this._connection = connection;

        this._connection.fileStarted.subscribe(this.onFileStarted);
    }


    @Delegate
    private async onFileStarted(target: Channel<ProcessMessages>, message: FileStartMessage) {
        const path: Path = new Path(message.path);
        const testClass: Class<object> | undefined = await this.loadTestClass(path);

        if (testClass != null) {
            const testCommand: TestCommand = new TestCommand(path, testClass);

            await this._testRunner.run(testCommand);
        }

        await this._connection.endFile(path);
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
