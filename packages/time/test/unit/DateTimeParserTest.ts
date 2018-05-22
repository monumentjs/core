import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {DateTime} from '../../main/DateTime';
import {DateTimeParser} from '../../main/DateTimeParser';


export class DateTimeParserTest {
    protected parser = DateTimeParser.instance;


    @Test
    public 'parse() returns parsed DateTime'(assert: Assert) {
        const time: DateTime = this.parser.parse(
            `Current date and time is 2017-8-25 11:05:14.303 PM.`,
            'Current date and time is {YYYY}-{M}-{D} {HH}:{mm}:{ss}.{fff} {AA}.'
        );

        assert.equals(time.year, 2017);
        assert.equals(time.month, 8);
        assert.equals(time.dayOfMonth, 25);
        assert.equals(time.hours, 23);
        assert.equals(time.minutes, 5);
        assert.equals(time.seconds, 14);
        assert.equals(time.milliseconds, 303);
    }
}
