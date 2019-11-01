import { filter } from '../../../src/operators/filter';
import { isEven } from '../../util/isEven';
import { isOdd } from '../../util/isOdd';

describe('filter()', function() {
  it('should yield items matching predicate', function() {
    const source = [1, 2, 3];
    const evens = filter(source, isEven);
    const odds = filter(source, isOdd);

    expect([...evens]).toEqual([2]);
    expect([...odds]).toEqual([1, 3]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const source = [1, 2, 3];
    const evens = filter(source, isEven);
    const odds = filter(source, isOdd);

    expect([...evens]).toEqual([2]);
    expect([...odds]).toEqual([1, 3]);

    source.push(4, 5);

    expect([...evens]).toEqual([2, 4]);
    expect([...odds]).toEqual([1, 3, 5]);
  });
});
