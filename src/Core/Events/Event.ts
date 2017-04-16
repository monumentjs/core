import {assertArgumentNotNull} from '../Assertion/Assert';


export default class Event {
    private _type: string;
    private _isCancelled: boolean = false;


    public get type(): string {
        return this._type;
    }


    public get isCancelled(): boolean {
        return this._isCancelled;
    }


    public constructor(type: string) {
        assertArgumentNotNull('type', type);

        this._type = type;
    }


    public cancel(): void {
        this._isCancelled = true;
    }
}
