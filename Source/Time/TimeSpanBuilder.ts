import {IBuilder} from '../Core/Abstraction/IBuilder';
import {TimeSpan} from './TimeSpan';


export class TimeSpanBuilder implements IBuilder<TimeSpan> {
    public days: number = 0;
    public hours: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;
    public milliseconds: number = 0;


    public getValue(): TimeSpan {
        return new TimeSpan(this.days, this.hours, this.minutes, this.seconds, this.milliseconds);
    }
}
