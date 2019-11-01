import { IgnoreCaseEquals } from '@monument/comparison';
import { equals } from '../../../src/operators/equals';

describe('equals()', function() {
  it('should check equality of 2 sources using default equality comparator', function() {
    expect(equals(['a', 'B'], ['a', 'B'])).toBe(true);
    expect(equals(['a', 'b'], ['a', 'B'])).toBe(false);
    expect(equals(['a', 'b'], ['a', 'b'])).toBe(true);
    expect(equals(['a', 'b'], ['a', 'b', 'c'])).toBe(false);
    expect(equals(['a', 'b', 'c'], ['a', 'b'])).toBe(false);
  });

  it('should check equality of 2 sources using custom equality comparator', function() {
    expect(equals(['a', 'B'], ['a', 'B'], IgnoreCaseEquals)).toBe(true);
    expect(equals(['a', 'b'], ['a', 'B'], IgnoreCaseEquals)).toBe(true);
    expect(equals(['a', 'b'], ['a', 'b'], IgnoreCaseEquals)).toBe(true);
    expect(equals(['a', 'b'], ['a', 'b', 'c'], IgnoreCaseEquals)).toBe(false);
    expect(equals(['a', 'b', 'c'], ['a', 'b'], IgnoreCaseEquals)).toBe(false);
  });
});
