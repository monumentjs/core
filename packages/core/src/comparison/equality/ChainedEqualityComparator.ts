import { EqualityComparator } from './EqualityComparator';
import { ReferenceEqualityComparator } from './ReferenceEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ChainedEqualityComparator {
  private readonly _comparisons: Array<[any, any, EqualityComparator<any>]> = [];

  get result(): boolean {
    return this._comparisons.every(([x, y, comparator]) => {
      return comparator.equals(x, y);
    });
  }

  withField<F>(x: F, y: F): this;
  withField<F>(x: F, y: F, comparator: EqualityComparator<F>): this;
  withField<F>(x: F, y: F, comparator: EqualityComparator<F> = ReferenceEqualityComparator.get()): this {
    this._comparisons.push([x, y, comparator]);

    return this;
  }
}
