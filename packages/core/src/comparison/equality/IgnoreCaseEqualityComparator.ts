import {EqualityComparator} from './EqualityComparator';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class IgnoreCaseEqualityComparator implements EqualityComparator<string | null | undefined> {
    private static _instance: IgnoreCaseEqualityComparator | undefined;

    public static get(): IgnoreCaseEqualityComparator {
        if (this._instance == null) {
            this._instance = new IgnoreCaseEqualityComparator();
        }

        return this._instance;
    }

    private constructor() {
    }

    public equals(current: string | null | undefined, other: string | null | undefined): boolean {
        if (current == null && other == null) {
            return true;
        }

        if (current == null || other == null) {
            return false;
        }

        if (current.length !== other.length) {
            return false;
        }

        return current.toLowerCase() === other.toLowerCase();
    }
}
