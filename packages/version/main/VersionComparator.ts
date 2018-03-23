import {GetInstance} from '@monument/core/Language/decorator/GetInstance';
import {ComparisonResult} from '@monument/core/main/ComparisonResult';
import {Comparator} from '@monument/core/main/Comparator';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {NumberComparator} from '@monument/core/main/NumberComparator';
import {Version} from './Version';


export class VersionComparator implements Comparator<Version>, EqualityComparator<Version> {
    @GetInstance()
    public static readonly instance: VersionComparator;


    private constructor() {}


    public equals(x: Version, y: Version): boolean {
        {
            let result = NumberComparator.instance.compare(x.major, y.major);

            if (result !== ComparisonResult.Equals) {
                return false;
            }
        }

        {
            let result = NumberComparator.instance.compare(x.minor, y.minor);

            if (result !== ComparisonResult.Equals) {
                return false;
            }
        }

        {
            let result = NumberComparator.instance.compare(x.patch, y.patch);

            if (result !== ComparisonResult.Equals) {
                return false;
            }
        }

        {
            let result = NumberComparator.instance.compare(x.releaseStatus, y.releaseStatus);

            if (result !== ComparisonResult.Equals) {
                return false;
            }
        }

        {
            let result = NumberComparator.instance.compare(x.revision, y.revision);

            if (result !== ComparisonResult.Equals) {
                return false;
            }
        }

        return true;
    }


    public compare(x: Version, y: Version): ComparisonResult {
        {
            let result = NumberComparator.instance.compare(x.major, y.major);

            if (result !== ComparisonResult.Equals) {
                return result;
            }
        }

        {
            let result = NumberComparator.instance.compare(x.minor, y.minor);

            if (result !== ComparisonResult.Equals) {
                return result;
            }
        }

        {
            let result = NumberComparator.instance.compare(x.patch, y.patch);

            if (result !== ComparisonResult.Equals) {
                return result;
            }
        }

        {
            let result = NumberComparator.instance.compare(x.releaseStatus, y.releaseStatus);

            if (result !== ComparisonResult.Equals) {
                return result;
            }
        }

        {
            let result = NumberComparator.instance.compare(x.revision, y.revision);

            if (result !== ComparisonResult.Equals) {
                return result;
            }
        }

        return ComparisonResult.Equals;
    }
}
