import {IComparator} from '../Core/Collections/IComparator';
import {ComparisonResult} from '../Core/types';
import {VERSION_COMPONENTS} from './types';
import Version from './Version';
import {assertArgumentNotNull} from '../Assertion/Assert';


export default class VersionComparator implements IComparator<Version> {
    public compare(currentVersion: Version, otherVersion: Version): ComparisonResult {
        assertArgumentNotNull('currentVersion', currentVersion);
        assertArgumentNotNull('otherVersion', otherVersion);

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
