import {ComparisonResult} from '../../core/main/ComparisonResult';
import {GetInstance} from '../../core/Language/decorator/GetInstance';
import {EqualityComparator} from '../../core/main/EqualityComparator';
import {Comparator} from '../../core/main/Comparator';


export class PreserveCaseComparator implements EqualityComparator<string>, Comparator<string> {
    @GetInstance()
    public static readonly instance: PreserveCaseComparator;


    private constructor() {}


    public equals(current: string, other: string): boolean {
        return current === other;
    }


    public compare(current: string, other: string): ComparisonResult {
        if (current > other) {
            return ComparisonResult.Greater;
        }

        if (current < other) {
            return ComparisonResult.Less;
        }

        return ComparisonResult.Equals;
    }
}
