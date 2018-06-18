import {EventArgs} from '@monument/core/main/events/EventArgs';
import {Duration} from '@monument/core/main/time/Duration';
import {TestFile} from '../../object-model/TestFile';


export class TestFileEndedEventArgs extends EventArgs {
    private readonly _testFile: TestFile;
    private readonly _duration: Duration;


    public get testFile(): TestFile {
        return this._testFile;
    }


    public get duration(): Duration {
        return this._duration;
    }


    public constructor(testFile: TestFile, duration: Duration) {
        super();
        this._testFile = testFile;
        this._duration = duration;
    }
}
