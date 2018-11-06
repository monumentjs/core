import {Comparator} from './Comparator';
import {Ordered} from './Ordered';
import {ComparisonResult} from './ComparisonResult';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class PriorityComparator implements Comparator<Ordered> {
    private static _instance: PriorityComparator | undefined;

    public static get(): PriorityComparator {
        if (this._instance == null) {
            this._instance = new PriorityComparator();
        }

        return this._instance;
    }

    private constructor() {}

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
