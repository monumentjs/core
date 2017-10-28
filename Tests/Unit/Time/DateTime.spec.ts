import {DateTime} from '../../../Source/Time/DateTime';
import {IPropertyAccess} from '../../../Source/Core/Abstraction/IPropertyAccess';


describe('DateTime', () => {
    const CURRENT_YEAR: number = 2016;
    const CURRENT_MONTH: number = 1;
    const CURRENT_DAY_OF_MONTH: number = 5;
    const CURRENT_HOURS: number = 15;
    const CURRENT_MINUTES: number = 4;
    const CURRENT_SECONDS: number = 6;
    const CURRENT_MILLISECONDS: number = 89;


    let time: DateTime;


    function assertDateTimeComponents(dateTime: DateTime, components: IPropertyAccess<any>) {
        Object.keys(components).forEach((key: string) => {
            expect((dateTime as IPropertyAccess<any>)[key]).toEqual(components[key]);
        });
    }


    beforeEach(() => {
        expect(function () {
            time = new DateTime(
                CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY_OF_MONTH,
                CURRENT_HOURS, CURRENT_MINUTES, CURRENT_SECONDS, CURRENT_MILLISECONDS
            );
        }).not.toThrow();
    });


    describe('constructor()', () => {
        it('creates new instance of class', () => {
            expect(time).toBeInstanceOf(DateTime);
        });
    });


    describe(`year`, () => {
        it(`gets year component of instance`, () => {
            assertDateTimeComponents(time, {
                year: CURRENT_YEAR,
                month: CURRENT_MONTH,
                dayOfMonth: CURRENT_DAY_OF_MONTH,
                hours: CURRENT_HOURS,
                minutes: CURRENT_MINUTES,
                seconds: CURRENT_SECONDS,
                milliseconds: CURRENT_MILLISECONDS
            });
        });

        it(`sets year component of instance`, () => {
            time = time.addYears(1);

            assertDateTimeComponents(time, {
                year: CURRENT_YEAR + 1,
                month: CURRENT_MONTH,
                dayOfMonth: CURRENT_DAY_OF_MONTH,
                hours: CURRENT_HOURS,
                minutes: CURRENT_MINUTES,
                seconds: CURRENT_SECONDS,
                milliseconds: CURRENT_MILLISECONDS
            });
        });

        it(`updates dayOfMonth component when switching to leap year`, () => {
            time = new DateTime(
                CURRENT_YEAR, CURRENT_MONTH, 29,
                CURRENT_HOURS, CURRENT_MINUTES, CURRENT_SECONDS, CURRENT_MILLISECONDS
            );
            time = time.addYears(1);

            assertDateTimeComponents(time, {
                year: CURRENT_YEAR + 1,
                month: CURRENT_MONTH,
                dayOfMonth: 28,
                hours: CURRENT_HOURS,
                minutes: CURRENT_MINUTES,
                seconds: CURRENT_SECONDS,
                milliseconds: CURRENT_MILLISECONDS
            });
        });
    });


    describe('addMonths(months)', () => {
        it(`adds specified number of months`, () => {
            time = new DateTime(2017, 0, 31).addMonths(1);

            assertDateTimeComponents(time, {
                year: 2017,
                month: 1,
                dayOfMonth: 28,
                dayOfWeek: 2
            });
        });
    });


    describe('toString()', () => {
        it(`returns formatted representation of DateTime instance`, () => {
            expect(time.toString('Year: {YYYY}')).toBe(`Year: ${CURRENT_YEAR.toString()}`);
            expect(time.toString('Year: {YY}')).toBe(`Year: ${(CURRENT_YEAR % 100).toString()}`);
            expect(time.toString('Month: {MMMM}')).toBe(`Month: February`);
            expect(time.toString('Month: {MMM}')).toBe(`Month: Feb`);
            expect(time.toString('Month: {MM}')).toBe(`Month: 02`);
            expect(time.toString('Month: {M}')).toBe(`Month: 2`);
            expect(time.toString('Day Of Month: {DD}')).toBe(`Day Of Month: 05`);
            expect(time.toString('Day Of Month: {D}')).toBe(`Day Of Month: 5`);
            expect(time.toString('Day Of Week: {dddd}')).toBe(`Day Of Week: Friday`);
            expect(time.toString('Day Of Week: {ddd}')).toBe(`Day Of Week: Fri`);
            expect(time.toString('Day Of Week: {dd}')).toBe(`Day Of Week: Fr`);
            expect(time.toString('Day Of Week: {d}')).toBe(`Day Of Week: 6`);
            expect(time.toString('24-Hours: {HH}')).toBe(`24-Hours: 15`);
            expect(time.toString('24-Hours: {H}')).toBe(`24-Hours: 15`);
            expect(time.toString('12-Hours: {hh}')).toBe(`12-Hours: 03`);
            expect(time.toString('12-Hours: {h}')).toBe(`12-Hours: 3`);
            expect(time.toString('AM/PM (Full): {AA}')).toBe(`AM/PM (Full): PM`);
            expect(time.toString('AM/PM (Short): {A}')).toBe(`AM/PM (Short): P`);
            expect(time.toString('am/pm (Full): {aa}')).toBe(`am/pm (Full): pm`);
            expect(time.toString('am/pm (Short): {a}')).toBe(`am/pm (Short): p`);
            expect(time.toString('Minutes: {mm}')).toBe(`Minutes: 04`);
            expect(time.toString('Minutes: {m}')).toBe(`Minutes: 4`);
            expect(time.toString('Seconds: {ss}')).toBe(`Seconds: 06`);
            expect(time.toString('Seconds: {s}')).toBe(`Seconds: 6`);
            expect(time.toString('Milliseconds: {fff}')).toBe(`Milliseconds: 089`);
            expect(time.toString('Milliseconds: {ff}')).toBe(`Milliseconds: 08`);
            expect(time.toString('Milliseconds: {f}')).toBe(`Milliseconds: 0`);
        });
    });
});
