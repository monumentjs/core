import {LoggerModule} from '@monument/logger/main/LoggerModule';
import {CurrentProcessModule} from '@monument/node/main/process/CurrentProcessModule';
import {LocalFileSystemModule} from '@monument/node/main/file-system/local/LocalFileSystemModule';
import {Path} from '@monument/node/main/path/Path';
import {Channel} from '@monument/node/main/process/Channel';
import {ConfigurationModule} from '../configuration/ConfigurationModule';
import {TestRunner} from '../runner/TestRunner';
import {TestRunnerModule} from '../runner/TestRunnerModule';
import {ProcessMessages} from '../connection/messaging/ProcessMessages';
import {SlaveConnection} from '../connection/SlaveConnection';
import {FileStartMessage} from '../connection/messaging/FileStartMessage';
import {ConnectionModule} from '../connection/ConnectionModule';
import {Boot} from '@monument/core/main/application/decorators/Boot';
import {Application} from '@monument/core/main/stereotype/Application';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {TestFileLoader} from '../runner/TestFileLoader';
import {TestFile} from '../object-model/TestFile';
import {TestContextModule} from '../context/TestContextModule';
import {TestReporterModule} from '../reporter/TestReporterModule';
import {SystemInfoModule} from '@monument/node/main/system/info/SystemInfoModule';


@Boot
@Application({
    modules: [
        CurrentProcessModule,
        LocalFileSystemModule,
        SystemInfoModule,
        LoggerModule,

        ConnectionModule,
        TestReporterModule,
        TestRunnerModule,
        TestContextModule,
        ConfigurationModule
    ]
})
export class SlaveApplication {
    private readonly _testFileLoader: TestFileLoader;
    private readonly _testRunner: TestRunner;
    private readonly _connection: SlaveConnection;


    public constructor(
        connection: SlaveConnection,
        testRunner: TestRunner,
        testFileLoader: TestFileLoader
    ) {
        this._testFileLoader = testFileLoader;
        this._testRunner = testRunner;
        this._connection = connection;

        this._connection.fileStarted.subscribe(this.onFileStarted);
    }


    @Delegate
    private async onFileStarted(target: Channel<ProcessMessages>, message: FileStartMessage) {
        const path: Path = new Path(message.path);
        const testFile: TestFile = await this._testFileLoader.load(path);

        await this._testRunner.runTestFile(testFile);

        await this._connection.endFile(path);
    }
}
