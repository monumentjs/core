import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export class PathPattern {
    protected _pattern: RegExp;


    public constructor(pattern: RegExp) {
        assertArgumentNotNull('pattern', pattern);

        this._pattern = pattern;
    }


    public test(path: string): boolean {
        assertArgumentNotNull('path', path);

        path = path.replace(/\\+/g, '/');

        return this._pattern.test(path);
    }
}
