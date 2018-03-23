import { NullSafeEqualityComparator } from '../../../main/NullSafeEqualityComparator';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { Case } from '../../../../test-drive/Decorators/Case';


@Test()
export class NullSafeEqualityComparatorSpec {

    @Case()
    public 'equals() checks equality of values treating null and undefined as equals'() {
        let comparator: NullSafeEqualityComparator = NullSafeEqualityComparator.instance;
        let x;
        let y;

        expect(comparator.equals(null, null)).toBe(true);
        expect(comparator.equals(undefined, null)).toBe(true);
        expect(comparator.equals(null, undefined)).toBe(true);

        x = y = {};

        expect(comparator.equals(x, x)).toBe(true);
        expect(comparator.equals(y, y)).toBe(true);
        expect(comparator.equals(x, y)).toBe(true);
        expect(comparator.equals(y, x)).toBe(true);
        expect(comparator.equals(x, undefined)).toBe(false);
        expect(comparator.equals(undefined, x)).toBe(false);
        expect(comparator.equals(x, null)).toBe(false);
        expect(comparator.equals(null, x)).toBe(false);
        expect(comparator.equals(y, undefined)).toBe(false);
        expect(comparator.equals(undefined, y)).toBe(false);
        expect(comparator.equals(y, null)).toBe(false);
        expect(comparator.equals(null, y)).toBe(false);

        x = {};
        y = {};

        expect(comparator.equals(x, x)).toBe(true);
        expect(comparator.equals(y, y)).toBe(true);
        expect(comparator.equals(x, y)).toBe(false);
        expect(comparator.equals(y, x)).toBe(false);
        expect(comparator.equals(x, undefined)).toBe(false);
        expect(comparator.equals(undefined, x)).toBe(false);
        expect(comparator.equals(x, null)).toBe(false);
        expect(comparator.equals(null, x)).toBe(false);
        expect(comparator.equals(y, undefined)).toBe(false);
        expect(comparator.equals(undefined, y)).toBe(false);
        expect(comparator.equals(y, null)).toBe(false);
        expect(comparator.equals(null, y)).toBe(false);
    }
}
