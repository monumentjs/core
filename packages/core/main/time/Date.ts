import {DayOfWeek} from './DayOfWeek';


export interface Date {
    readonly year: number;
    readonly month: number;
    readonly dayOfYear: number;
    readonly dayOfMonth: number;
    readonly dayOfWeek: DayOfWeek;
}
