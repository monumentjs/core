import { Comparator } from '../order/Comparator';
import { ComparisonResult } from '../order/ComparisonResult';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ObjectComparator {
  private readonly _comparisons: Array<[any, any, Comparator<any>]> = [];

  get result(): ComparisonResult {
    for (const [x, y, comparator] of this._comparisons) {
      const result: ComparisonResult = comparator.compare(x, y);

      if (result !== ComparisonResult.EQUALS) {
        return result;
      }
    }

    return ComparisonResult.EQUALS;
  }

  compareFields<T>(x: T, y: T, comparator: Comparator<T>) {
    this._comparisons.push([x, y, comparator]);
  }
}
