

export interface IEvent {
    type: string;
}


export default class Event implements IEvent {
    private _type: string;


    get type(): string {
        return this._type;
    }


    constructor(type: string) {
        this._type = type;
    }
}

