import {EqualityComparator} from '../EqualityComparator';
import {ComparisonResult} from '../utils/comparison/ComparisonResult';
import {Comparator} from '../utils/comparison/Comparator';
import {Singleton} from '../stereotype/Singleton';


@Singleton
export class IgnoreCaseComparator implements EqualityComparator<string>, Comparator<string> {

    public equals(current: string, other: string): boolean {
        if (current.length !== other.length) {
            return false;
        }

        return current.toLowerCase() === other.toLowerCase();
    }


    public compare(current: string, other: string): ComparisonResult {
        current = current.toLowerCase();
        other = other.toLowerCase();

        if (current > other) {
            return ComparisonResult.GREATER;
        }

        if (current < other) {
            return ComparisonResult.LESS;
        }

        return ComparisonResult.EQUALS;
    }
}
