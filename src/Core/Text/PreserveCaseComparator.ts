import {IEqualityComparator} from '../Collections/IEqualityComparator';
import {IComparator} from '../Collections/IComparator';
import {ComparisonResult} from '../types';
import {assertArgumentNotNull} from '../Assertion/Assert';


export class PreserveCaseComparator implements IEqualityComparator<string>, IComparator<string> {
    public static readonly instance: PreserveCaseComparator = new PreserveCaseComparator();


    public equals(current: string, other: string): boolean {
        assertArgumentNotNull('current', current);
        assertArgumentNotNull('other', other);

        return current === other;
    }


    public compare(current: string, other: string): ComparisonResult {
        assertArgumentNotNull('current', current);
        assertArgumentNotNull('other', other);

        if (current > other) {
            return ComparisonResult.Greater;
        } else if (current < other) {
            return ComparisonResult.Less;
        } else {
            return ComparisonResult.Equals;
        }
    }
}
