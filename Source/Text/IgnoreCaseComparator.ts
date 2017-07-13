import {IEqualityComparator} from '../Collections/IEqualityComparator';
import {IComparator} from '../Collections/IComparator';
import {ComparisonResult} from '../types';
import {Assert} from '../Assertion/Assert';


export class IgnoreCaseComparator implements IEqualityComparator<string>, IComparator<string> {
    public static readonly instance: IgnoreCaseComparator = new IgnoreCaseComparator();


    public equals(current: string, other: string): boolean {
        Assert.argument('current', current).notNull();
        Assert.argument('other', other).notNull();

        if (current.length !== other.length) {
            return false;
        }

        current = current.toLowerCase();
        other = other.toLowerCase();

        return current === other;
    }


    public compare(current: string, other: string): ComparisonResult {
        Assert.argument('current', current).notNull();
        Assert.argument('other', other).notNull();

        current = current.toLowerCase();
        other = other.toLowerCase();

        if (current > other) {
            return ComparisonResult.Greater;
        } else if (current < other) {
            return ComparisonResult.Less;
        } else {
            return ComparisonResult.Equals;
        }
    }
}
