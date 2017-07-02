import {Assert} from '../../../Core/Assertion/Assert';


export class AcceptType {
    private _mimeType: string;
    private _priority: number;


    public get mimeType(): string {
        return this._mimeType;
    }


    public get priority(): number {
        return this._priority;
    }


    public constructor(mimeType: string, priority: number) {
        Assert.argument('mimeType', mimeType).notNull();
        Assert.argument('priority', priority).notNull().bounds(0, 1);

        this._mimeType = mimeType;
        this._priority = priority;
    }
}
