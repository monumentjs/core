import {Assert} from '../Assertion/Assert';


export class Event<TType = string> {
    private _type: TType;
    private _isCancelled: boolean = false;


    public get type(): TType {
        return this._type;
    }


    public get isCancelled(): boolean {
        return this._isCancelled;
    }


    public constructor(type: TType) {
        Assert.argument('type', type).notNull();

        this._type = type;
    }


    public cancel(): void {
        this._isCancelled = true;
    }
}
