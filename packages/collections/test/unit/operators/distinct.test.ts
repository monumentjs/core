import { IgnoreCaseEquals } from '@monument/comparison';
import { distinct } from '../../../src/operators/distinct';

describe('distinct()', function() {
  it('should yield only unique items', function() {
    const source = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    const result = distinct(source);

    expect([...result]).toEqual([1, 2, 3, 4, 5]);
  });

  it('should yield only unique items using custom equality comparator', function() {
    const source = ['a', 'b', 'c', 'A', 'B', 'C', 'D'];
    const result = distinct(source, IgnoreCaseEquals);

    expect([...result]).toEqual(['a', 'b', 'c', 'D']);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const source: Array<number> = [];
    const result = distinct(source);

    expect([...result]).toEqual([]);

    source.push(1, 2);

    expect([...result]).toEqual([1, 2]);

    source.push(3, 4, 5, 4, 3, 2, 1);

    expect([...result]).toEqual([1, 2, 3, 4, 5]);
  });
});
