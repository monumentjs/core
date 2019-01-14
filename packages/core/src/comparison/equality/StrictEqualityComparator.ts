import {EqualityComparator} from './EqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class StrictEqualityComparator implements EqualityComparator<any> {
    private static _instance: StrictEqualityComparator | undefined;

    public static get(): StrictEqualityComparator {
        if (this._instance == null) {
            this._instance = new StrictEqualityComparator();
        }

        return this._instance;
    }

    private constructor() {
    }

    public equals(x: any, y: any): boolean {
        return x === y;
    }
}
