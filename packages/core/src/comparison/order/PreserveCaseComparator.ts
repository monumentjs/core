import {Comparator} from './Comparator';
import {ComparisonResult} from './ComparisonResult';

export class PreserveCaseComparator implements Comparator<string> {
    private static _instance: PreserveCaseComparator | undefined;

    public static get(): PreserveCaseComparator {
        if (this._instance == null) {
            this._instance = new PreserveCaseComparator();
        }

        return this._instance;
    }

    private constructor() {
    }

    public compare(current: string, other: string): ComparisonResult {
        if (current > other) {
            return ComparisonResult.GREATER;
        }

        if (current < other) {
            return ComparisonResult.LESS;
        }

        return ComparisonResult.EQUALS;
    }
}
