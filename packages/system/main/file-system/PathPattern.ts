

export class PathPattern {
    protected _pattern: RegExp;


    public constructor(pattern: RegExp) {
        this._pattern = pattern;
    }


    public test(path: string): boolean {
        path = this.normalizePath(path);

        return this._pattern.test(path);
    }


    protected normalizePath(path: string): string {
        path = path.replace(/\\+/g, '/');

        return path;
    }
}
