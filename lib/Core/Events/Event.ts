import {IEvent} from './IEvent';


export default class Event implements IEvent {
    private _type: string;


    public get type(): string {
        return this._type;
    }


    public constructor(type: string) {
        this._type = type;
    }
}
