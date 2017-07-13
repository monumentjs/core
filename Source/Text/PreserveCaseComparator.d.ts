import { IEqualityComparator } from '../Collections/IEqualityComparator';
import { IComparator } from '../Collections/IComparator';
import { ComparisonResult } from '../types';
export declare class PreserveCaseComparator implements IEqualityComparator<string>, IComparator<string> {
    static readonly instance: PreserveCaseComparator;
    equals(current: string, other: string): boolean;
    compare(current: string, other: string): ComparisonResult;
}
