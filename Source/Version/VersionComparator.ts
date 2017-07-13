import {IComparator} from '../Collections/IComparator';
import {ComparisonResult} from '../types';
import {VERSION_COMPONENTS} from './types';
import {Version} from './Version';
import {Assert} from '../Assertion/Assert';
import {IEqualityComparator} from '../Collections/IEqualityComparator';


export class VersionComparator implements IComparator<Version>, IEqualityComparator<Version> {
    public static readonly instance: VersionComparator = new VersionComparator();


    public equals(currentVersion: Version, otherVersion: Version): boolean {
        Assert.argument('currentVersion', currentVersion).notNull();
        Assert.argument('otherVersion', otherVersion).notNull();

        for (let componentName of VERSION_COMPONENTS) {
            let componentOfCurrentVersion: number = currentVersion[componentName];
            let componentOfOtherVersion: number = otherVersion[componentName];

            if (componentOfCurrentVersion !== componentOfOtherVersion) {
                return false;
            }
        }

        return true;
    }


    public compare(currentVersion: Version, otherVersion: Version): ComparisonResult {
        Assert.argument('currentVersion', currentVersion).notNull();
        Assert.argument('otherVersion', otherVersion).notNull();

        for (let componentName of VERSION_COMPONENTS) {
            let componentOfCurrentVersion: number = currentVersion[componentName];
            let componentOfOtherVersion: number = otherVersion[componentName];
            let result: ComparisonResult = this.compareVersionComponents(
                componentOfCurrentVersion,
                componentOfOtherVersion
            );
        
            if (result !== ComparisonResult.Equals) {
                return result;
            }
        }
    
        return ComparisonResult.Equals;
    }
    
    
    private compareVersionComponents(current: number, other: number): ComparisonResult {
        return current < other ? ComparisonResult.Less
             : current > other ? ComparisonResult.Greater
                               : ComparisonResult.Equals;
    }
}
