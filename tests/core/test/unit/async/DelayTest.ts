import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Delay} from '@monument/core/main/async/Delay';
import {Duration} from '@monument/core/main/time/Duration';


export class DelayTest {

    @Test
    public 'wait() returns Promise'(assert: Assert) {
        const delay = new Delay(new Duration(0, 0, 0, 10));

        assert.true(delay.wait() instanceof Promise);
    }
}
