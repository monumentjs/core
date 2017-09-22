import {ComparisonResult} from '../Core/Types/ComparisonResult';
import {Singleton} from '../Language/Decorators/Singleton';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';
import {IComparator} from '../Core/Abstraction/IComparator';
import {Service} from '../DI/Decorators/Service';


@Service()
@Singleton()
export class IgnoreCaseComparator implements IEqualityComparator<string>, IComparator<string> {
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
