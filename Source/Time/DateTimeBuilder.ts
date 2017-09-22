import {DateTime} from './DateTime';
import {IBuilder} from '../Core/Abstraction/IBuilder';


export class DateTimeBuilder implements IBuilder<DateTime> {
    public year: number = 0;
    public month: number = 0;
    public dayOfMonth: number = 0;
    public hours: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;
    public milliseconds: number = 0;


    public getValue(): DateTime {
        return new DateTime(this.year, this.month, this.dayOfMonth, this.hours, this.minutes, this.seconds, this.milliseconds);
    }
}
