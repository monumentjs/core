import {EventArgs} from '@monument/core/main/events/EventArgs';
import {TestClass} from '../../object-model/TestClass';
import {TestFile} from '../../object-model/TestFile';


export class TestClassStartedEventArgs extends EventArgs {
    private readonly _testFile: TestFile;
    private readonly _testClass: TestClass;


    public get testClass(): TestClass {
        return this._testClass;
    }


    public get testFile(): TestFile {
        return this._testFile;
    }


    public constructor(testFile: TestFile, testClass: TestClass) {
        super();
        this._testFile = testFile;
        this._testClass = testClass;
    }
}
