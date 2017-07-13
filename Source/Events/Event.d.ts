export declare class Event<TType = string> {
    private _type;
    private _isCancelled;
    readonly type: TType;
    readonly isCancelled: boolean;
    constructor(type: TType);
    cancel(): void;
}
