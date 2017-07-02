import {Assert} from '../../Core/Assertion/Assert';


export class PathPattern {
    protected _pattern: RegExp;


    public constructor(pattern: RegExp) {
        Assert.argument('pattern', pattern).notNull();

        this._pattern = pattern;
    }


    public test(path: string): boolean {
        Assert.argument('path', path).notNull();

        path = path.replace(/\\+/g, '/');

        return this._pattern.test(path);
    }
}
