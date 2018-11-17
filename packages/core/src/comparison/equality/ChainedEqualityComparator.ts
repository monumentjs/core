import {EqualityComparator} from './EqualityComparator';
import {StrictEqualityComparator} from './StrictEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ChainedEqualityComparator {
    private readonly _comparisons: Array<[any, any, EqualityComparator<any>]> = [];

    public get result(): boolean {
        return this._comparisons.every(([x, y, comparator]) => {
            return comparator.equals(x, y);
        });
    }

    public withField<F>(x: F, y: F): this;
    public withField<F>(x: F, y: F, comparator: EqualityComparator<F>): this;
    public withField<F>(x: F, y: F, comparator: EqualityComparator<F> = StrictEqualityComparator.get()): this {
        this._comparisons.push([x, y, comparator]);

        return this;
    }
}
