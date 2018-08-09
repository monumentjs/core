import {Comparator} from '../utils/comparison/Comparator';
import {ComparisonResult} from '../utils/comparison/ComparisonResult';
import {Version} from './Version';
import {NumberComparator} from '../utils/comparison/NumberComparator';


export class VersionComparator implements Comparator<Version> {
    private readonly _numberComparator: NumberComparator;


    public constructor(numberComparator: NumberComparator) {
        this._numberComparator = numberComparator;

    }


    public compare(x: Version, y: Version): ComparisonResult {
        {
            const result = this._numberComparator.compare(x.major, x.major);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        {
            const result = this._numberComparator.compare(x.minor, x.minor);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        {
            const result = this._numberComparator.compare(x.patch, x.patch);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        {
            const result = this._numberComparator.compare(x.releaseStatus, x.releaseStatus);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        {
            const result = this._numberComparator.compare(x.revision, x.revision);

            if (result !== ComparisonResult.EQUALS) {
                return result;
            }
        }

        return ComparisonResult.EQUALS;
    }

}
