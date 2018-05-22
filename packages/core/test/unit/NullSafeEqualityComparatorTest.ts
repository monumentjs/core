import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {NullSafeEqualityComparator} from '../../main/NullSafeEqualityComparator';


export class NullSafeEqualityComparatorTest {

    @Test
    public 'equals() checks equality of values treating null and undefined as equals'(assert: Assert) {
        let comparator: NullSafeEqualityComparator = NullSafeEqualityComparator.instance;
        let x;
        let y;

        assert.true(comparator.equals(null, null));
        assert.true(comparator.equals(undefined, null));
        assert.true(comparator.equals(null, undefined));

        x = y = {};

        assert.true(comparator.equals(x, x));
        assert.true(comparator.equals(y, y));
        assert.true(comparator.equals(x, y));
        assert.true(comparator.equals(y, x));
        assert.false(comparator.equals(x, undefined));
        assert.false(comparator.equals(undefined, x));
        assert.false(comparator.equals(x, null));
        assert.false(comparator.equals(null, x));
        assert.false(comparator.equals(y, undefined));
        assert.false(comparator.equals(undefined, y));
        assert.false(comparator.equals(y, null));
        assert.false(comparator.equals(null, y));

        x = {};
        y = {};

        assert.true(comparator.equals(x, x));
        assert.true(comparator.equals(y, y));
        assert.false(comparator.equals(x, y));
        assert.false(comparator.equals(y, x));
        assert.false(comparator.equals(x, undefined));
        assert.false(comparator.equals(undefined, x));
        assert.false(comparator.equals(x, null));
        assert.false(comparator.equals(null, x));
        assert.false(comparator.equals(y, undefined));
        assert.false(comparator.equals(undefined, y));
        assert.false(comparator.equals(y, null));
        assert.false(comparator.equals(null, y));
    }
}
