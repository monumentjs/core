import { findAll } from '../../../src/operators/findAll';
import { isEven } from '../../util/isEven';

describe('findAll()', function() {
  it('should find all items matching predicate', function() {
    const source = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = findAll(source, isEven);

    expect([...result]).toEqual([2, 4, 6, 8]);
  });

  it('should find specific amount of items matching predicate', function() {
    const source = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = findAll(source, isEven, 1, 2);

    expect([...result]).toEqual([4, 6]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const source = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = findAll(source, isEven, 1, 4);

    expect([...result]).toEqual([4, 6, 8]);

    source.push(10, 11, 12);

    expect([...result]).toEqual([4, 6, 8, 10]);
  });
});
