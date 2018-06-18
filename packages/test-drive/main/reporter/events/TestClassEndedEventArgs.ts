import {EventArgs} from '@monument/core/main/events/EventArgs';
import {TestClass} from '../../object-model/TestClass';
import {TestFile} from '../../object-model/TestFile';
import {Duration} from '@monument/core/main/time/Duration';


export class TestClassEndedEventArgs extends EventArgs {
    private readonly _testFile: TestFile;
    private readonly _testClass: TestClass;
    private readonly _duration: Duration;


    public get duration(): Duration {
        return this._duration;
    }


    public get testClass(): TestClass {
        return this._testClass;
    }


    public get testFile(): TestFile {
        return this._testFile;
    }


    public constructor(testFile: TestFile, testClass: TestClass, duration: Duration) {
        super();
        this._testFile = testFile;
        this._testClass = testClass;
        this._duration = duration;
    }
}
