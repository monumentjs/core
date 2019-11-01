import { InvalidArgumentException } from '@monument/assert';
import { skip } from '../../../src/operators/skip';

describe('skip()', function() {
  it('should skip specified amount of items and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const result = skip(source, 2);

    expect([...result]).toEqual([]);

    source.push('a', 'b');

    expect([...result]).toEqual([]);

    source.push('c', 'd');

    expect([...result]).toEqual(['c', 'd']);
  });

  it('should throw when offset is negative', function() {
    expect(() => skip([], -1)).toThrow(InvalidArgumentException);
  });
});
