import {GetInstance} from './decorators/GetInstance';
import {EqualityComparator} from './EqualityComparator';
import {ComparisonResult} from './ComparisonResult';
import {Comparator} from './Comparator';


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
            return ComparisonResult.GREATER;
        } else if (current < other) {
            return ComparisonResult.LESS;
        } else {
            return ComparisonResult.EQUALS;
        }
    }
}
