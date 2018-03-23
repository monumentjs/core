import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {Case} from '../../../../test-drive/decorator/Case';
import {DateTime} from '../../../../time/main/DateTime';
import {DateTimeParser} from '../../../../time/main/DateTimeParser';


@Test()
export class DateTimeParserSpec {
    protected parser = DateTimeParser.instance;


    @Case()
    public 'parse() returns parsed DateTime'() {
        let time: DateTime = this.parser.parse(
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
    }
}
