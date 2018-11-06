import {EqualityComparator} from './EqualityComparator';
import {StrictEqualityComparator} from './StrictEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ObjectEqualityComparator<T extends object> {
    private readonly _comparisons: Array<[any, any, EqualityComparator<any>]> = [];
    private readonly _originalObjectsComparison: [T, T, EqualityComparator<T>];

    public get result(): boolean {
        const [objectA, objectB, objectComparator] = this._originalObjectsComparison;

        if (objectComparator.equals(objectA, objectB)) {
            return true;
        }

        return this._comparisons.every(([fieldX, fieldY, fieldComparator]) => {
            return fieldComparator.equals(fieldX, fieldY);
        });
    }

    public constructor(objectA: T, objectB: T, objectComparator: EqualityComparator<T> = StrictEqualityComparator.get()) {
        this._originalObjectsComparison = [objectA, objectB, objectComparator];
    }

    public withField<F>(x: F, y: F, comparator: EqualityComparator<F> = StrictEqualityComparator.get()): this {
        this._comparisons.push([x, y, comparator]);

        return this;
    }
}
