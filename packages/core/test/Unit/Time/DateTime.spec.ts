import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {BeforeEach} from '@monument/test-drive/Decorators/BeforeEach';
import {Case} from '../../../../test-drive/Decorators/Case';
import {DateTime} from '../../../../time/main/DateTime';


const CURRENT_YEAR: number = 2016;
const CURRENT_MONTH: number = 1;
const CURRENT_DAY_OF_MONTH: number = 5;
const CURRENT_HOURS: number = 15;
const CURRENT_MINUTES: number = 4;
const CURRENT_SECONDS: number = 6;
const CURRENT_MILLISECONDS: number = 89;


@Test()
export class DateTimeSpec {

    protected time: DateTime;


    @BeforeEach()
    public setUpTest() {
        this.time = new DateTime(
            CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY_OF_MONTH,
            CURRENT_HOURS, CURRENT_MINUTES, CURRENT_SECONDS, CURRENT_MILLISECONDS
        );
    }


    @Case()
    public 'constructor() creates new instance of class'() {
        expect(this.time).toBeInstanceOf(DateTime);
    }


    @Case()
    public 'year, month, dayOfMonth, hours, minutes, seconds, milliseconds'() {
        this.assertDateTimeComponents(this.time, {
            year: CURRENT_YEAR,
            month: CURRENT_MONTH,
            dayOfMonth: CURRENT_DAY_OF_MONTH,
            hours: CURRENT_HOURS,
            minutes: CURRENT_MINUTES,
            seconds: CURRENT_SECONDS,
            milliseconds: CURRENT_MILLISECONDS
        });
    }


    @Case()
    public 'addYears() creates new instance with increased year component'() {
        this.time = this.time.addYears(1);

        this.assertDateTimeComponents(this.time, {
            year: CURRENT_YEAR + 1,
            month: CURRENT_MONTH,
            dayOfMonth: CURRENT_DAY_OF_MONTH,
            hours: CURRENT_HOURS,
            minutes: CURRENT_MINUTES,
            seconds: CURRENT_SECONDS,
            milliseconds: CURRENT_MILLISECONDS
        });
    }


    @Case()
    public 'addYears() updates dayOfMonth component when switching to leap year'() {
        this.time = new DateTime(
            CURRENT_YEAR, CURRENT_MONTH, 29,
            CURRENT_HOURS, CURRENT_MINUTES, CURRENT_SECONDS, CURRENT_MILLISECONDS
        );
        this.time = this.time.addYears(1);

        this.assertDateTimeComponents(this.time, {
            year: CURRENT_YEAR + 1,
            month: CURRENT_MONTH,
            dayOfMonth: 28,
            hours: CURRENT_HOURS,
            minutes: CURRENT_MINUTES,
            seconds: CURRENT_SECONDS,
            milliseconds: CURRENT_MILLISECONDS
        });
    }


    @Case()
    public 'addMonths() adds specified number of months'() {
        this.time = new DateTime(2017, 0, 31).addMonths(1);

        this.assertDateTimeComponents(this.time, {
            year: 2017,
            month: 1,
            dayOfMonth: 28,
            dayOfWeek: 2
        });
    }


    @Case()
    public 'toString() returns formatted representation of DateTime instance'() {
        expect(this.time.toString('Year: {YYYY}')).toBe(`Year: ${CURRENT_YEAR.toString()}`);
        expect(this.time.toString('Year: {YY}')).toBe(`Year: ${(CURRENT_YEAR % 100).toString()}`);
        expect(this.time.toString('Month: {MMMM}')).toBe(`Month: February`);
        expect(this.time.toString('Month: {MMM}')).toBe(`Month: Feb`);
        expect(this.time.toString('Month: {MM}')).toBe(`Month: 02`);
        expect(this.time.toString('Month: {M}')).toBe(`Month: 2`);
        expect(this.time.toString('Day Of Month: {DD}')).toBe(`Day Of Month: 05`);
        expect(this.time.toString('Day Of Month: {D}')).toBe(`Day Of Month: 5`);
        expect(this.time.toString('Day Of Week: {dddd}')).toBe(`Day Of Week: Friday`);
        expect(this.time.toString('Day Of Week: {ddd}')).toBe(`Day Of Week: Fri`);
        expect(this.time.toString('Day Of Week: {dd}')).toBe(`Day Of Week: Fr`);
        expect(this.time.toString('Day Of Week: {d}')).toBe(`Day Of Week: 6`);
        expect(this.time.toString('24-Hours: {HH}')).toBe(`24-Hours: 15`);
        expect(this.time.toString('24-Hours: {H}')).toBe(`24-Hours: 15`);
        expect(this.time.toString('12-Hours: {hh}')).toBe(`12-Hours: 03`);
        expect(this.time.toString('12-Hours: {h}')).toBe(`12-Hours: 3`);
        expect(this.time.toString('AM/PM (Full): {AA}')).toBe(`AM/PM (Full): PM`);
        expect(this.time.toString('AM/PM (Short): {A}')).toBe(`AM/PM (Short): P`);
        expect(this.time.toString('am/pm (Full): {aa}')).toBe(`am/pm (Full): pm`);
        expect(this.time.toString('am/pm (Short): {a}')).toBe(`am/pm (Short): p`);
        expect(this.time.toString('Minutes: {mm}')).toBe(`Minutes: 04`);
        expect(this.time.toString('Minutes: {m}')).toBe(`Minutes: 4`);
        expect(this.time.toString('Seconds: {ss}')).toBe(`Seconds: 06`);
        expect(this.time.toString('Seconds: {s}')).toBe(`Seconds: 6`);
        expect(this.time.toString('Milliseconds: {fff}')).toBe(`Milliseconds: 089`);
        expect(this.time.toString('Milliseconds: {ff}')).toBe(`Milliseconds: 08`);
        expect(this.time.toString('Milliseconds: {f}')).toBe(`Milliseconds: 0`);
    }


    protected assertDateTimeComponents(dateTime: DateTime, components: any) {
        Object.keys(components).forEach((key: string) => {
            expect((dateTime as any)[key]).toEqual(components[key]);
        });
    }
}
