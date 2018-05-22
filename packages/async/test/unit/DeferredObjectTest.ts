import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {DeferredObject} from '../../main/DeferredObject';


export class DeferredObjectTest {
    private instance!: DeferredObject<number>;


    @BeforeEach
    public setUpTest() {
        this.instance = new DeferredObject();
    }


    @Test
    public 'initial state'(assert: Assert) {
        assert.true(this.instance.isPending);
        assert.false(this.instance.isResolved);
        assert.false(this.instance.isRejected);
    }


    @Test
    public async 'resolve() assigns a value to deferred object'(assert: Assert) {
        this.instance.resolve(123);

        assert.false(this.instance.isPending);
        assert.true(this.instance.isResolved);
        assert.false(this.instance.isRejected);

        assert.equals(await this.instance.promise, 123);
    }
}
