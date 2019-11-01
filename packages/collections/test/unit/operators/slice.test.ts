import { InvalidArgumentException } from '@monument/assert';
import { slice } from '../../../src/operators/slice';

describe('slice()', function() {
  it('should iterate over specified slice of source and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const result = slice(source, 1, 3);

    expect([...result]).toEqual([]);

    source.push('a', 'b');

    expect([...result]).toEqual(['b']);

    source.push('c', 'd');

    expect([...result]).toEqual(['b', 'c', 'd']);

    source.push('e', 'f');

    expect([...result]).toEqual(['b', 'c', 'd']);
  });

  it('should throw if offset is negative', function() {
    expect(() => slice([], -1, 2)).toThrow(InvalidArgumentException);
  });

  it('should throw if limit is negative', function() {
    expect(() => slice([], 1, -2)).toThrow(InvalidArgumentException);
  });
});
