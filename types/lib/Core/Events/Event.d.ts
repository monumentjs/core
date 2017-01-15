export interface IEvent {
    type: string;
}
export default class Event implements IEvent {
    private _type;
    readonly type: string;
    constructor(type: string);
}
