import { EqualityComparator } from './EqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ReferenceEqualityComparator implements EqualityComparator<any> {
    private static _instance: ReferenceEqualityComparator | undefined;

    public static get(): ReferenceEqualityComparator {
        if (this._instance == null) {
            this._instance = new ReferenceEqualityComparator();
        }

        return this._instance;
    }

    private constructor() {}

    public equals(x: any, y: any): boolean {
        return x === y;
    }
}
