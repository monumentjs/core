import {Comparator} from './Comparator';
import {ComparisonResult} from './ComparisonResult';

export class IgnoreCaseComparator implements Comparator<string> {
    private static _instance: IgnoreCaseComparator | undefined;

    public static get(): IgnoreCaseComparator {
        if (this._instance == null) {
            this._instance = new IgnoreCaseComparator();
        }

        return this._instance;
    }

    private constructor() {
    }

    public compare(current: string, other: string): ComparisonResult {
        const _current = current.toLowerCase();
        const _other = other.toLowerCase();

        if (_current > _other) {
            return ComparisonResult.GREATER;
        }

        if (_current < _other) {
            return ComparisonResult.LESS;
        }

        return ComparisonResult.EQUALS;
    }
}
