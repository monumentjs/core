import {GetInstance} from './decorators/GetInstance';
import {EqualityComparator} from './EqualityComparator';
import {ComparisonResult} from './ComparisonResult';
import {Comparator} from './Comparator';


export class PreserveCaseComparator implements EqualityComparator<string>, Comparator<string> {
    @GetInstance()
    public static readonly instance: PreserveCaseComparator;


    private constructor() {}


    public equals(current: string, other: string): boolean {
        return current === other;
    }


    public compare(current: string, other: string): ComparisonResult {
        if (current > other) {
            return ComparisonResult.GREATER;
        }

        if (current < other) {
            return ComparisonResult.LESS;
        }

        return ComparisonResult.EQUALS;
    }
}
