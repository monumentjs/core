import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {Case} from '../../../../test-drive/Decorators/Case';
import {BeforeEach} from '@monument/test-drive/Decorators/BeforeEach';
import {DeferredObject} from '../../main/DeferredObject';


@Test()
export class DeferredObjectSpec {
    private instance: DeferredObject<number>;


    @BeforeEach()
    public setUpTest() {
        this.instance = new DeferredObject();
    }


    @Case()
    public 'constructor() creates new instance of DeferredObject'() {
        expect(this.instance).toBeInstanceOf(DeferredObject);

        expect(this.instance.promise).toBeInstanceOf(Promise);
        expect(this.instance.isPending).toBe(true);
        expect(this.instance.isResolved).toBe(false);
        expect(this.instance.isRejected).toBe(false);
    }


    @Case()
    public async 'resolve() assigns a value to deferred object'() {
        this.instance.resolve(123);

        expect(this.instance.promise).toBeInstanceOf(Promise);
        expect(this.instance.isPending).toBe(false);
        expect(this.instance.isResolved).toBe(true);
        expect(this.instance.isRejected).toBe(false);

        await expect(this.instance.promise).resolves.toBe(123);
    }
}
