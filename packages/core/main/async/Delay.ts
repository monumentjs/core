import {Duration} from '../time/Duration';


export class Delay {
    private readonly _delay: Duration;


    public constructor(delay: Duration) {
        this._delay = delay;
    }


    public wait(): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, this._delay.totalMilliseconds);
        });
    }
}
