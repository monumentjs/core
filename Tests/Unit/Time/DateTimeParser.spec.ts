import {DateTime} from '../../../Source/Time/DateTime';
import {DateTimeParser} from '../../../Source/Time/DateTimeParser';


describe(`DateTimeParser`, () => {
    const parser = DateTimeParser.instance;


    test(`parsing date string`, () => {
        let date: DateTime = parser.parse(
            `Current date and time is 2017-8-25 11:05:14.303 PM.`,
            'Current date and time is {YYYY}-{M}-{D} {HH}:{mm}:{ss}.{fff} {AA}.'
        );

        expect(date).toBeInstanceOf(DateTime);
        expect(date.year).toBe(2017);
        expect(date.month).toBe(8);
        expect(date.dayOfMonth).toBe(25);
        expect(date.hours).toBe(23);
        expect(date.minutes).toBe(5);
        expect(date.seconds).toBe(14);
        expect(date.milliseconds).toBe(303);
    });
});
