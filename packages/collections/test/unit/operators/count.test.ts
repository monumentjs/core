import { count } from '../../../src/operators/count';
import { isEven } from '../../util/isEven';
import { isOdd } from '../../util/isOdd';

describe('count()', function() {
  it('should accept empty source', function() {
    const source: Array<number> = [];
    const evens = count(source, isEven);
    const odds = count(source, isOdd);

    expect(evens).toBe(0);
    expect(odds).toBe(0);
  });

  it('should count items matching predicate', function() {
    const source: Array<number> = [1, 2, 3, 4, 5];
    const evens = count(source, isEven);
    const odds = count(source, isOdd);

    expect(evens).toBe(2);
    expect(odds).toBe(3);
  });
});
