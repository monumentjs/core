import {EventArgs} from '@monument/core/main/events/EventArgs';
import {TestFile} from '../../object-model/TestFile';


export class TestFileStartedEventArgs extends EventArgs {
    private readonly _testFile: TestFile;

    public get testFile(): TestFile {
        return this._testFile;
    }


    public constructor(testFile: TestFile) {
        super();
        this._testFile = testFile;
    }
}
