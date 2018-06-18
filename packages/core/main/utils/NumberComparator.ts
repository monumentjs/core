import {Comparator} from '../Comparator';
import {ComparisonResult} from '../ComparisonResult';
import {Singleton} from '../stereotype/Singleton';


@Singleton
export class NumberComparator implements Comparator<number> {

    public compare(x: number, y: number): ComparisonResult {
        if (x > y) {
            return ComparisonResult.GREATER;
        }

        if (x < y) {
            return ComparisonResult.LESS;
        }

        return ComparisonResult.EQUALS;
    }
}
