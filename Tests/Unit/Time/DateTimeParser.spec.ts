import {DateTime} from '../../../Source/Time/DateTime';
import {DateTimeParser} from '../../../Source/Time/DateTimeParser';


describe(`DateTimeParser`, () => {
    const parser = DateTimeParser.instance;


    test(`parsing date string`, () => {
        let time: DateTime = parser.parse(
            `Current date and time is 2017-8-25 11:05:14.303 PM.`,
            'Current date and time is {YYYY}-{M}-{D} {HH}:{mm}:{ss}.{fff} {AA}.'
        );

        expect(time).toBeInstanceOf(DateTime);
        expect(time.year).toBe(2017);
        expect(time.month).toBe(8);
        expect(time.dayOfMonth).toBe(25);
        expect(time.hours).toBe(23);
        expect(time.minutes).toBe(5);
        expect(time.seconds).toBe(14);
        expect(time.milliseconds).toBe(303);
    });
});
