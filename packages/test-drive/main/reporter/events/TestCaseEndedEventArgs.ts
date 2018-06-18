import {Duration} from '@monument/core/main/time/Duration';
import {EventArgs} from '@monument/core/main/events/EventArgs';
import {TestClass} from '../../object-model/TestClass';
import {TestFile} from '../../object-model/TestFile';
import {TestCase} from '../../object-model/TestCase';
import {TestReport} from '../../report/TestReport';


export class TestCaseEndedEventArgs extends EventArgs {
    private readonly _testReport: TestReport;
    private readonly _testFile: TestFile;
    private readonly _testClass: TestClass;
    private readonly _testCase: TestCase;
    private readonly _duration: Duration;


    public get duration(): Duration {
        return this._duration;
    }


    public get testCase(): TestCase {
        return this._testCase;
    }


    public get testClass(): TestClass {
        return this._testClass;
    }


    public get testReport(): TestReport {
        return this._testReport;
    }


    public get testFile(): TestFile {
        return this._testFile;
    }


    public constructor(testFile: TestFile, testClass: TestClass, testCase: TestCase, testReport: TestReport, duration: Duration) {
        super();
        this._testReport = testReport;
        this._testFile = testFile;
        this._testClass = testClass;
        this._testCase = testCase;
        this._duration = duration;
    }
}
