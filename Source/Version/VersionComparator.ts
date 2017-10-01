import {Version} from './Version';
import {GetInstance} from '../Language/Decorators/GetInstance';
import {ComparisonResult} from '../Core/Types/ComparisonResult';
import {IComparator} from '../Core/Abstraction/IComparator';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';
import {Service} from '../DI/Decorators/Service';


@Service()
export class VersionComparator implements IComparator<Version>, IEqualityComparator<Version> {
    @GetInstance()
    public static readonly instance: VersionComparator;


    private constructor() {}


    public equals(x: Version, y: Version): boolean {
        return x.equals(y);
    }


    public compare(x: Version, y: Version): ComparisonResult {
        return x.compareTo(y);
    }
}
