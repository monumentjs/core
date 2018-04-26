import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {BeforeEach} from '@monument/test-drive/Decorators/BeforeEach';
import {Case} from '../../../../test-drive/Decorators/Case';
import {DateTime} from '../../main/DateTime';


const CURRENT_YEAR: number = 2016;
const CURRENT_MONTH: number = 1;
const CURRENT_DAY_OF_MONTH: number = 5;
const CURRENT_HOURS: number = 15;
const CURRENT_MINUTES: number = 4;
const CURRENT_SECONDS: number = 6;
const CURRENT_MILLISECONDS: number = 89;


export class DateTimeSpec {

    protected time: DateTime;


    @BeforeEach()
    public setUpTest() {
        this.time = new DateTime(
            CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY_OF_MONTH,
            CURRENT_HOURS, CURRENT_MINUTES, CURRENT_SECONDS, CURRENT_MILLISECONDS
        );
    }


    @Test
    public 'constructor() creates new instance of class'(assert: Assert) {
        expect(this.time).toBeInstanceOf(DateTime);
    }


    @Test
    public 'year, month, dayOfMonth, hours, minutes, seconds, milliseconds'(assert: Assert) {
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


    @Test
    public 'addYears() creates new instance with increased year component'(assert: Assert) {
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


    @Test
    public 'addYears() updates dayOfMonth component when switching to leap year'(assert: Assert) {
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


    @Test
    public 'addMonths() adds specified number of months'(assert: Assert) {
        this.time = new DateTime(2017, 0, 31).addMonths(1);

        this.assertDateTimeComponents(this.time, {
            year: 2017,
            month: 1,
            dayOfMonth: 28,
            dayOfWeek: 2
        });
    }


    @Test
    public 'toString() returns formatted representation of DateTime instance'(assert: Assert) {
        assert.equals(this.time.toString('Year: {YYYY}'), `Year: ${CURRENT_YEAR.toString()}`);
        assert.equals(this.time.toString('Year: {YY}'), `Year: ${(CURRENT_YEAR % 100).toString()}`);
        assert.equals(this.time.toString('Month: {MMMM}'), `Month: February`);
        assert.equals(this.time.toString('Month: {MMM}'), `Month: Feb`);
        assert.equals(this.time.toString('Month: {MM}'), `Month: 02`);
        assert.equals(this.time.toString('Month: {M}'), `Month: 2`);
        assert.equals(this.time.toString('Day Of Month: {DD}'), `Day Of Month: 05`);
        assert.equals(this.time.toString('Day Of Month: {D}'), `Day Of Month: 5`);
        assert.equals(this.time.toString('Day Of Week: {dddd}'), `Day Of Week: Friday`);
        assert.equals(this.time.toString('Day Of Week: {ddd}'), `Day Of Week: Fri`);
        assert.equals(this.time.toString('Day Of Week: {dd}'), `Day Of Week: Fr`);
        assert.equals(this.time.toString('Day Of Week: {d}'), `Day Of Week: 6`);
        assert.equals(this.time.toString('24-Hours: {HH}'), `24-Hours: 15`);
        assert.equals(this.time.toString('24-Hours: {H}'), `24-Hours: 15`);
        assert.equals(this.time.toString('12-Hours: {hh}'), `12-Hours: 03`);
        assert.equals(this.time.toString('12-Hours: {h}'), `12-Hours: 3`);
        assert.equals(this.time.toString('AM/PM (Full): {AA}'), `AM/PM (Full): PM`);
        assert.equals(this.time.toString('AM/PM (Short): {A}'), `AM/PM (Short): P`);
        assert.equals(this.time.toString('am/pm (Full): {aa}'), `am/pm (Full): pm`);
        assert.equals(this.time.toString('am/pm (Short): {a}'), `am/pm (Short): p`);
        assert.equals(this.time.toString('Minutes: {mm}'), `Minutes: 04`);
        assert.equals(this.time.toString('Minutes: {m}'), `Minutes: 4`);
        assert.equals(this.time.toString('Seconds: {ss}'), `Seconds: 06`);
        assert.equals(this.time.toString('Seconds: {s}'), `Seconds: 6`);
        assert.equals(this.time.toString('Milliseconds: {fff}'), `Milliseconds: 089`);
        assert.equals(this.time.toString('Milliseconds: {ff}'), `Milliseconds: 08`);
        assert.equals(this.time.toString('Milliseconds: {f}'), `Milliseconds: 0`);
    }


    protected assertDateTimeComponents(dateTime: DateTime, components: any) {
        Object.keys(components).forEach((key: string) => {
            assert.equals((dateTime as any)[key], components[key]);
        });
    }
}
