import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {Logger} from '@monument/logger/main/logger/Logger';
import {TestClassContext} from '../context/TestClassContext';
import {TestReport} from '../report/TestReport';
import {TestStatus} from '../report/TestStatus';
import {Component} from '@monument/core/main/stereotype/Component';
import {Type} from '@monument/core/main/Type';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {TestClass} from '../object-model/TestClass';
import {TestFile} from '../object-model/TestFile';
import {TestHook} from '../object-model/TestHook';
import {TestCase} from '../object-model/TestCase';
import {TestClassContextFactory} from '../context/factory/TestClassContextFactory';
import {DurationMeter} from '@monument/core/main/time/DurationMeter';
import {TestFileStartedEventArgs} from '../reporter/events/TestFileStartedEventArgs';
import {TestFileEndedEventArgs} from '../reporter/events/TestFileEndedEventArgs';
import {TestCaseEndedEventArgs} from '../reporter/events/TestCaseEndedEventArgs';
import {TestCaseStartedEventArgs} from '../reporter/events/TestCaseStartedEventArgs';
import {TestClassStartedEventArgs} from '../reporter/events/TestClassStartedEventArgs';
import {TestClassEndedEventArgs} from '../reporter/events/TestClassEndedEventArgs';
import {TestFileLoader} from './TestFileLoader';
import {Path} from '@monument/node/main/path/Path';
import {SlaveConnection} from '../connection/SlaveConnection';


@Component
export class TestRunner {
    private readonly _logger: Logger;
    private readonly _connection: SlaveConnection;
    private readonly _testFileLoader: TestFileLoader;
    private readonly _testContextFactory: TestClassContextFactory;


    public constructor(
        loggerManager: LoggerManager,
        connection: SlaveConnection,
        testContextFactory: TestClassContextFactory,
        testFileLoader: TestFileLoader
    ) {
        this._logger = loggerManager.getLogger(this.constructor.name);
        this._connection = connection;
        this._testFileLoader = testFileLoader;
        this._testContextFactory = testContextFactory;
    }


    public async runTestFile(path: Path): Promise<void> {
        const testFile: TestFile = await this._testFileLoader.load(path);

        try {
            const durationMeter: DurationMeter = new DurationMeter();

            await this._connection.notifyTestFileStarted(path);

            durationMeter.start();

            await this.runTestClass(testFile, testFile.testClass);

            durationMeter.end();

            await this._connection.notifyTestFileEnded(new TestFileEndedEventArgs(testFile, durationMeter.duration));
        } catch (e) {
            await this._logger.error(`Error in test file "${testFile.path.toString()}"`, e);
        }
    }


    private async runTestClass(testFile: TestFile, testClass: TestClass): Promise<void> {
        if (testClass.isIgnored) {
            return;
        }

        const durationMeter: DurationMeter = new DurationMeter();
        const testConstructor: Type<object> = testClass.class.type;
        const testContext: TestClassContext = await this._testContextFactory.get(testConstructor);
        const instance: object = await testContext.getUnit(testConstructor);

        await this._connection.onTestClassStarted(new TestClassStartedEventArgs(testFile, testClass));

        durationMeter.start();

        for (const testHook of testClass.beforeAllHooks) {
            await this.runTestHook(testHook, testContext, instance);
        }

        for (const testCase of testClass.testCases) {
            for (const testHook of testClass.beforeEachHooks) {
                await this.runTestHook(testHook, testContext, instance);
            }

            await this.runTestCase(testFile, testClass, testCase, testContext, instance);

            for (const testHook of testClass.afterEachHooks) {
                await this.runTestHook(testHook, testContext, instance);
            }
        }

        for (const testHook of testClass.afterAllHooks) {
            await this.runTestHook(testHook, testContext, instance);
        }

        durationMeter.end();

        await this._connection.onTestClassEnded(new TestClassEndedEventArgs(testFile, testClass, durationMeter.duration));

        await testContext.stop();
    }


    private async runTestHook(testHook: TestHook, testContext: TestClassContext, instance: object): Promise<void> {
        if (testHook.isIgnored) {
            return;
        }

        await testContext.invoke(instance, testHook);
    }


    private async runTestCase(testFile: TestFile, testClass: TestClass, testCase: TestCase, testContext: TestClassContext, instance: object): Promise<void> {
        const durationMeter: DurationMeter = new DurationMeter();
        let error: Exception | undefined;

        await this._connection.onTestCaseStarted(
            new TestCaseStartedEventArgs(testFile, testClass, testCase)
        );

        durationMeter.start();

        if (!testCase.isIgnored) {
            try {
                await testContext.invoke(instance, testCase);
            } catch (e) {
                error = Exception.cast(e);
            }
        }

        durationMeter.end();

        const testReport: TestReport = {
            testFilePath: testFile.path.toString(),
            testClassName: testClass.class.name,
            testMethodName: testCase.displayName,
            status: testCase.isIgnored ? TestStatus.IGNORED : error == null ? TestStatus.PASSED : TestStatus.FAILED,
            duration: durationMeter.duration.totalMilliseconds,
            error: error
        };

        await this._connection.onTestCaseEnded(
            new TestCaseEndedEventArgs(testFile, testClass, testCase, testReport, durationMeter.duration)
        );
    }
}
