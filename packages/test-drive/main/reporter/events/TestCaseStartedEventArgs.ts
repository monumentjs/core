import {EventArgs} from '@monument/core/main/events/EventArgs';
import {TestClass} from '../../object-model/TestClass';
import {TestFile} from '../../object-model/TestFile';
import {TestCase} from '../../object-model/TestCase';


export class TestCaseStartedEventArgs extends EventArgs {
    private readonly _testFile: TestFile;
    private readonly _testClass: TestClass;
    private readonly _testCase: TestCase;


    public get testCase(): TestCase {
        return this._testCase;
    }


    public get testClass(): TestClass {
        return this._testClass;
    }


    public get testFile(): TestFile {
        return this._testFile;
    }


    public constructor(testFile: TestFile, testClass: TestClass, testCase: TestCase) {
        super();
        this._testFile = testFile;
        this._testClass = testClass;
        this._testCase = testCase;
    }
}
