import {Comparator} from './Comparator';
import {ComparisonResult} from './ComparisonResult';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class NumberComparator implements Comparator<number> {
    private static _instance: NumberComparator | undefined;

    public static get(): NumberComparator {
        if (this._instance == null) {
            this._instance = new NumberComparator();
        }

        return this._instance;
    }

    private constructor() {}

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
