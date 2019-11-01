import { NumberCompare, SortOrder } from '@monument/comparison';
import { orderBy } from '../../../src/operators/orderBy';

describe('orderBy()', function() {
  it('should sort source items in given order', function() {
    expect([...orderBy(['one', 'two', 'three', 'four'], s => s.length, NumberCompare)]).toEqual(['one', 'two', 'four', 'three']);
    expect([...orderBy(['one', 'two', 'three', 'four'], s => s.length, NumberCompare, SortOrder.ASCENDING)]).toEqual(['one', 'two', 'four', 'three']);
    expect([...orderBy(['one', 'two', 'three', 'four'], s => s.length, NumberCompare, SortOrder.DESCENDING)]).toEqual(['three', 'four', 'one', 'two']);

    expect([...orderBy([1, 3, 5, 9, 7], n => n, NumberCompare)]).toEqual([1, 3, 5, 7, 9]);
    expect([...orderBy([1, 3, 5, 9, 7], n => n, NumberCompare, SortOrder.ASCENDING)]).toEqual([1, 3, 5, 7, 9]);
    expect([...orderBy([1, 3, 5, 9, 7], n => n, NumberCompare, SortOrder.DESCENDING)]).toEqual([9, 7, 5, 3, 1]);
  });

  it('should maintain on-demand evaluation', function() {
    const source: Array<number> = [];
    const result = orderBy(source, n => n, NumberCompare);

    expect([...result]).toEqual([]);

    source.push(3);

    expect([...result]).toEqual([3]);

    source.push(2);

    expect([...result]).toEqual([2, 3]);

    source.push(1);

    expect([...result]).toEqual([1, 2, 3]);

  });
});
