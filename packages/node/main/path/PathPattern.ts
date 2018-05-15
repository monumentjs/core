import {Path} from './Path';


export class PathPattern {
    private readonly _pattern: RegExp;


    public constructor(pattern: RegExp) {
        this._pattern = pattern;
    }


    public test(path: Path): boolean {
        return this._pattern.test(path.toString());
    }
}
