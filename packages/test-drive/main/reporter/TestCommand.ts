import {Path} from '@monument/node/main/path/Path';
import {Class} from '@monument/reflection/main/Class';


export class TestCommand {
    private readonly _filePath: Path;
    private readonly _testClass: Class<object>;


    public get filePath(): Path {
        return this._filePath;
    }


    public get testClass(): Class<object> {
        return this._testClass;
    }


    public constructor(filePath: Path, testClass: Class<object>) {
        this._filePath = filePath;
        this._testClass = testClass;
    }
}
