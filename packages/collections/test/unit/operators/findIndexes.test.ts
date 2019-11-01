import { findIndexes } from '../../../src/operators/findIndexes';

describe('findIndexes()', function() {
  it('should return indexes of items matching predicate and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const result = findIndexes(source, s => s.length === 3);

    expect([...result]).toEqual([]);

    source.push('one', 'two');

    expect([...result]).toEqual([0, 1]);

    source.push('three', 'four', 'five', 'six');

    expect([...result]).toEqual([0, 1, 5]);
  });
});
