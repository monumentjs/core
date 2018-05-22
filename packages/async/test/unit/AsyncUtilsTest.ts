import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {AsyncUtils} from '../../main/AsyncUtils';


export class AsyncUtilsTest {

    @Test
    public 'wait() returns Promise'(assert: Assert) {
        assert.true(AsyncUtils.wait(10) instanceof Promise);
    }
}
