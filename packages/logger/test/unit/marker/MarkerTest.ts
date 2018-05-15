import {Assert} from '@monument/test-drive/main/modules/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Marker} from '../../../main/marker/Marker';


export class MarkerTest {
    private error: Marker = new Marker('Error');
    private ioError: Marker = new Marker('IOError', this.error);
    private fsError: Marker = new Marker('FileSystemError', this.ioError);


    @Test
    public 'hierarchy'(assert: Assert) {
        assert.false(this.error.hasParents);
        assert.equals(this.error.parents.length, 0);

        assert.true(this.ioError.hasParents);
        assert.equals(this.ioError.parents.length, 1);
        assert.true(this.ioError.isInstanceOf(this.error));
        assert.true(this.ioError.isInstanceOf(this.ioError));

        assert.true(this.fsError.hasParents);
        assert.equals(this.fsError.parents.length, 1);
        assert.true(this.fsError.isInstanceOf(this.error));
        assert.true(this.fsError.isInstanceOf(this.ioError));
        assert.true(this.fsError.isInstanceOf(this.fsError));
    }
}
