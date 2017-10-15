import {ComparisonResult} from '../Core/Types/ComparisonResult';
import {GetInstance} from '../Language/Decorators/GetInstance';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';
import {IComparator} from '../Core/Abstraction/IComparator';


export class PreserveCaseComparator implements IEqualityComparator<string>, IComparator<string> {
    @GetInstance()
    public static readonly instance: PreserveCaseComparator;


    private constructor() {}


    public equals(current: string, other: string): boolean {
        return current === other;
    }


    public compare(current: string, other: string): ComparisonResult {
        if (current > other) {
            return ComparisonResult.Greater;
        } else if (current < other) {
            return ComparisonResult.Less;
        } else {
            return ComparisonResult.Equals;
        }
    }
}
