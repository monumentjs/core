import {IEqualityComparator} from '../Collections/IEqualityComparator';
import {IComparator} from '../Collections/IComparator';
import {ComparisonResult} from '../types';
import {Assert} from '../Assertion/Assert';
import {Container} from '../DI/Container/Container';
import {Singleton} from '../DI/Decorators/Singleton';


@Singleton()
export class PreserveCaseComparator implements IEqualityComparator<string>, IComparator<string> {
    public static get instance(): PreserveCaseComparator {
        return Container.get(this);
    }


    public equals(current: string, other: string): boolean {
        Assert.argument('current', current).notNull();
        Assert.argument('other', other).notNull();

        return current === other;
    }


    public compare(current: string, other: string): ComparisonResult {
        Assert.argument('current', current).notNull();
        Assert.argument('other', other).notNull();

        if (current > other) {
            return ComparisonResult.Greater;
        } else if (current < other) {
            return ComparisonResult.Less;
        } else {
            return ComparisonResult.Equals;
        }
    }
}
