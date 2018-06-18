import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Duration} from '@monument/core/main/time/Duration';
import {ComparisonResult} from '@monument/core/main/ComparisonResult';
import {MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND} from '@monument/core/main/time/Constants';

const HOURS = 12;
const MINUTES = 34;
const SECONDS = 51;
const MILLISECONDS = 229;
const TOTAL_MILLISECONDS =
    HOURS * MILLISECONDS_IN_HOUR +
    MINUTES * MILLISECONDS_IN_MINUTE +
    SECONDS * MILLISECONDS_IN_SECOND +
    MILLISECONDS;


export class DurationTest {
    private duration: Duration = new Duration(HOURS, MINUTES, SECONDS, MILLISECONDS);


    @Test
    public 'time components are correct'(assert: Assert): void {
        assert.equals(this.duration.hours, HOURS);
        assert.equals(this.duration.minutes, MINUTES);
        assert.equals(this.duration.seconds, SECONDS);
        assert.equals(this.duration.milliseconds, MILLISECONDS);
    }


    @Test
    public 'total time components are correct'(assert: Assert): void {
        assert.equals(this.duration.totalHours, TOTAL_MILLISECONDS / MILLISECONDS_IN_HOUR);
        assert.equals(this.duration.totalMinutes, TOTAL_MILLISECONDS / MILLISECONDS_IN_MINUTE);
        assert.equals(this.duration.totalSeconds, TOTAL_MILLISECONDS / MILLISECONDS_IN_SECOND);
        assert.equals(this.duration.totalMilliseconds, TOTAL_MILLISECONDS);
    }


    @Test
    public 'time components are corrected'(assert: Assert): void {
        const duration: Duration = new Duration(0, 0, 0, TOTAL_MILLISECONDS);

        assert.equals(duration.hours, HOURS);
        assert.equals(duration.minutes, MINUTES);
        assert.equals(duration.seconds, SECONDS);
        assert.equals(duration.milliseconds, MILLISECONDS);
    }


    @Test
    public 'zero duration'(assert: Assert): void {
        const duration: Duration = Duration.ZERO;

        assert.equals(duration.hours, 0);
        assert.equals(duration.minutes, 0);
        assert.equals(duration.seconds, 0);
        assert.equals(duration.milliseconds, 0);

        assert.equals(duration.totalHours, 0);
        assert.equals(duration.totalMinutes, 0);
        assert.equals(duration.totalSeconds, 0);
        assert.equals(duration.totalMilliseconds, 0);
    }


    @Test
    public 'comparison'(assert: Assert) {
        assert.equals(this.duration.compareTo(Duration.ZERO), ComparisonResult.GREATER);
        assert.equals(Duration.ZERO.compareTo(this.duration), ComparisonResult.LESS);
        assert.equals(Duration.ZERO.compareTo(Duration.ZERO), ComparisonResult.EQUALS);
        assert.equals(this.duration.compareTo(this.duration), ComparisonResult.EQUALS);
    }


    @Test
    public 'equality'(assert: Assert) {
        assert.false(this.duration.equals(Duration.ZERO));
        assert.false(Duration.ZERO.equals(this.duration));
        assert.true(Duration.ZERO.equals(Duration.ZERO));
        assert.true(this.duration.equals(this.duration));
    }
}
