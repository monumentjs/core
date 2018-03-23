import {Test} from '@monument/test-drive/main/decorators/Test';
import {Case} from '@monument/test-drive/main/decorators/Case';
import {AsyncUtils} from '../../main/AsyncUtils';


@Test()
export class AsyncUtilsSpec {

    @Case()
    public 'wait() returns Promise that resolves in specified amount of time'() {
        expect(AsyncUtils.wait(10)).toBeInstanceOf(Promise);
    }


    @Case()
    public async 'wait() receives duration of time in milliseconds'() {
        await expect(AsyncUtils.wait(10)).resolves.toBeUndefined();
    }
}
