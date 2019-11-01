import { IgnoreCaseEquals } from '@monument/comparison';
import { remove } from '../../../src/operators/remove';

describe('remove()', function() {
  it('should remove items from source equal to example item and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const result = remove(source, 'a', IgnoreCaseEquals);

    expect([...result]).toEqual([]);

    source.push('a');

    expect([...result]).toEqual([]);

    source.push('A');

    expect([...result]).toEqual([]);

    source.push('b');

    expect([...result]).toEqual(['b']);
  });
});
