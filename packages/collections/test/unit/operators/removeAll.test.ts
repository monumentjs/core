import { IgnoreCaseEquals } from '@monument/comparison';
import { removeAll } from '../../../src/operators/removeAll';

describe('removeAll()', function() {
  it('should remove items from source equal to example items and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const result = removeAll(source, ['a', 'B'], IgnoreCaseEquals);

    expect([...result]).toEqual([]);

    source.push('a');

    expect([...result]).toEqual([]);

    source.push('A');

    expect([...result]).toEqual([]);

    source.push('b');

    expect([...result]).toEqual([]);

    source.push('B');

    expect([...result]).toEqual([]);

    source.push('c');

    expect([...result]).toEqual(['c']);
  });
});
