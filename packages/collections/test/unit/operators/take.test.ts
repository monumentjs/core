import { InvalidArgumentException } from '@monument/assert';
import { take } from '../../../src/operators/take';

describe('take()', function() {
  it('should take specified number of items and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const result = take(source, 2);

    expect([...result]).toEqual([]);

    source.push('a', 'b', 'c');

    expect([...result]).toEqual(['a', 'b']);

    source.push('d', 'e', 'f');

    expect([...result]).toEqual(['a', 'b']);
  });

  it('should throw when limit is negative', function() {
    expect(() => take([], -1)).toThrow(InvalidArgumentException);
    expect(() => take([], 0)).not.toThrow(InvalidArgumentException);
  });
});
