import {Duration} from '@monument/time/main/Duration';


export class TestReport {
    private readonly _description: string;
    private readonly _duration: Duration;
    private readonly _error?: Error;

    public get error(): Error | undefined {
        return this._error;
    }


    public get description(): string {
        return this._description;
    }


    public get duration(): Duration {
        return this._duration;
    }


    public constructor(description: string, duration: Duration, error?: Error) {
        this._description = description;
        this._duration = duration;
        this._error = error;
    }
}
