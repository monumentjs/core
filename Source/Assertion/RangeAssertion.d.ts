export declare class RangeAssertion {
    private _from;
    private _to;
    constructor(from: number, to: number);
    bounds(): this;
    ofArguments(minArgumentName: string, maxArgumentName: string): this;
}
