import {Comparator} from './Comparator';
import {Ordered} from '../../Ordered';
import {ComparisonResult} from './ComparisonResult';


export class PriorityComparator implements Comparator<Ordered> {
    public compare(x: Ordered, y: Ordered): ComparisonResult {
        if (x.order > y.order) {
            return ComparisonResult.GREATER;
        }

        if (x.order < y.order) {
            return ComparisonResult.LESS;
        }

        return ComparisonResult.EQUALS;
    }
    
}
