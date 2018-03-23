

export class TestCase {
    private _methodName: string;
    private _isIgnored: boolean = false;
    private _isBeforeAll: boolean = false;
    private _isBeforeEach: boolean = false;
    private _isAfterAll: boolean = false;
    private _isAfterEach: boolean = false;


    public get methodName(): string {
        return this._methodName;
    }


    public get isIgnored(): boolean {
        return this._isIgnored;
    }


    public set isIgnored(value: boolean) {
        this._isIgnored = value;
    }


    public get isBeforeAll(): boolean {
        return this._isBeforeAll;
    }


    public set isBeforeAll(value: boolean) {
        this._isBeforeAll = value;
    }


    public get isBeforeEach(): boolean {
        return this._isBeforeEach;
    }


    public set isBeforeEach(value: boolean) {
        this._isBeforeEach = value;
    }


    public get isAfterAll(): boolean {
        return this._isAfterAll;
    }


    public set isAfterAll(value: boolean) {
        this._isAfterAll = value;
    }


    public get isAfterEach(): boolean {
        return this._isAfterEach;
    }


    public set isAfterEach(value: boolean) {
        this._isAfterEach = value;
    }


    public constructor(methodName: string) {
        this._methodName = methodName;
    }
}
