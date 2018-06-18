import {Path} from '@monument/node/main/path/Path';
import {TestClass} from './TestClass';


export class TestFile {
    private readonly _path: Path;
    private readonly _testClass: TestClass;


    public get path(): Path {
        return this._path;
    }


    public get testClass(): TestClass {
        return this._testClass;
    }


    public constructor(path: Path, testClass: TestClass) {
        this._path = path;
        this._testClass = testClass;
    }
}
