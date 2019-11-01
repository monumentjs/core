import { InvalidArgumentException } from '@monument/assert';
import { getAt, IndexOutOfBoundsException } from '../../..';

describe('getAt()', function() {
  it('should return item at specified position', function() {
    const source = ['a', 'b', 'c'];

    expect(getAt(source, 0)).toBe('a');
    expect(getAt(source, 1)).toBe('b');
    expect(getAt(source, 2)).toBe('c');
    expect(() => getAt(source, -1)).toThrow(InvalidArgumentException);
    expect(() => getAt(source, 3)).toThrow(IndexOutOfBoundsException);
  });
});
