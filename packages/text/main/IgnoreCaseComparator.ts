import {ComparisonResult} from '../../core/main/ComparisonResult';
import {GetInstance} from '../../core/Language/Decorators/GetInstance';
import {EqualityComparator} from '../../core/main/EqualityComparator';
import {Comparator} from '../../core/main/Comparator';


export class IgnoreCaseComparator implements EqualityComparator<string>, Comparator<string> {
    @GetInstance()
    public static readonly instance: IgnoreCaseComparator;


    private constructor() {}


    public equals(current: string, other: string): boolean {
        if (current.length !== other.length) {
            return false;
        }

        current = current.toLowerCase();
        other = other.toLowerCase();

        return current === other;
    }


    public compare(current: string, other: string): ComparisonResult {
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
