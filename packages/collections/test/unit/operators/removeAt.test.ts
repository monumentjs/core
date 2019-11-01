import { InvalidArgumentException } from '@monument/assert';
import { removeAt } from '../../../src/operators/removeAt';

describe('removeAt()', function() {
  it('should remove item at specific position and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const result = removeAt(source, 1);

    source.push('a', 'b');

    expect([...result]).toEqual(['a']);

    source.push('c', 'd');

    expect([...result]).toEqual(['a', 'c', 'd']);
  });

  it('should throw when position is negative', function() {
    expect(() => removeAt([], -1)).toThrow(InvalidArgumentException);
  });

  it('should throw when position is out of range during evaluation', function() {
    expect(() => [...removeAt([], 0)]).toThrow(InvalidArgumentException);
    expect(() => [...removeAt([], 1)]).toThrow(InvalidArgumentException);
  });
});
