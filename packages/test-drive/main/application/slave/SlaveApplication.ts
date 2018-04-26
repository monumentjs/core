import {Boot} from '@monument/application/main/decorators/Boot';
import {Delegate} from '@monument/events/main/decorators/Delegate';
import {CurrentProcess} from '@monument/system/main/process/CurrentProcess';
import {Path} from '@monument/system/main/file-system/Path';
import {Application} from '@monument/stereotype/main/Application';
import {AssertionModule} from '../../assert/AssertionModule';
import {MockModule} from '../../mock/MockModule';
import {ClusterMessage} from '../communication/ClusterMessage';
import {TestRunnerModule} from '../../runner/TestRunnerModule';
import {ClusterMessageType} from '../communication/ClusterMessageType';
import {RunTestFileResponseClusterMessage} from '../communication/RunTestFileResponseClusterMessage';
import {Reporter} from '../../reporter/Reporter';
import {ReportRecord} from '../../reporter/ReportRecord';
import {TestRunner} from '../../runner/TestRunner';


@Boot
@Application({
    modules: [
        AssertionModule,
        MockModule,
        TestRunnerModule
    ]
})
export class SlaveApplication {
    private readonly _process: CurrentProcess = CurrentProcess.instance;
    private readonly _runner: TestRunner;
    private readonly _reporter: Reporter = {
        async report(record: ReportRecord) {
            let message = `${record.className} > ${record.methodName}\n  `;

            if (record.exception) {
                message += record.exception.stack;
            } else {
                message += 'OK';
            }

            message += '\n';

            if (record.exception) {
                console.error(message);
            } else {
                console.info(message);
            }
        }
    };


    public constructor(runner: TestRunner) {
        this._runner = runner;
        this._runner.addReporter(this._reporter);
        this._process.messageReceived.subscribe(this.onMessageReceived);
    }


    @Delegate
    private async onMessageReceived(target: CurrentProcess, message: ClusterMessage) {
        switch (message.type) {
            case ClusterMessageType.RUN_TEST_FILE_REQUEST:
                await this.runTestFile(message.id, message.filePath);
                await this.endTestFile(message.id);
                break;

            default:
        }
    }


    private async runTestFile(id: number, filePath: string): Promise<void> {
        const path: Path = new Path(filePath);
        let exports: any;

        try {
            exports = await import(filePath);
        } catch (e) {
            console.error(e);

            return;
        }

        const constructor: any = exports[path.baseNameWithoutExtension];

        if (typeof constructor !== 'function') {
            console.error('Test class constructor not found in file', filePath);

            return;
        }

        await this._runner.run(constructor);
    }


    private endTestFile(id: number): Promise<void> {
        const message: RunTestFileResponseClusterMessage = {
            type: ClusterMessageType.RUN_TEST_FILE_RESPONSE,
            id: id
        };

        return this._process.send(message);
    }
}
