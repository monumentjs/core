import { IComparator } from '../Collections/IComparator';
import { ComparisonResult } from '../types';
import { Version } from './Version';
import { IEqualityComparator } from '../Collections/IEqualityComparator';
export declare class VersionComparator implements IComparator<Version>, IEqualityComparator<Version> {
    static readonly instance: VersionComparator;
    equals(currentVersion: Version, otherVersion: Version): boolean;
    compare(currentVersion: Version, otherVersion: Version): ComparisonResult;
    private compareVersionComponents(current, other);
}
