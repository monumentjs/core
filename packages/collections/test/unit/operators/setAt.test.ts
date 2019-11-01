import { InvalidArgumentException } from '@monument/assert';
import { setAt } from '../../../src/operators/setAt';

describe('setAt()', function() {
  it('should set item value at specified position and maintain on-demand evaluation', function() {
    const source = ['a', 'b', 'c'];
    const result = setAt(source, 1, '');

    expect([...result]).toEqual(['a', '', 'c']);

    source.push('d', 'e');

    expect([...result]).toEqual(['a', '', 'c', 'd', 'e']);
  });

  it('should throw when position is out of range', function() {
    expect(() => setAt([], -1, 'value')).toThrow(InvalidArgumentException);
    expect(() => setAt([], 0, 'value')).not.toThrow(InvalidArgumentException);
    expect(() => [...setAt([], 0, 'value')]).toThrow(InvalidArgumentException);
  });
});
