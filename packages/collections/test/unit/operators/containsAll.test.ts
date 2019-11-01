import { IgnoreCaseEquals } from '@monument/comparison';
import { containsAll } from '../../../src/operators/containsAll';

describe('containsAll()', function() {
  it('should check whether source contains given items', function() {
    const source = ['a', 'b', 'c'];

    expect(containsAll(source, 'a')).toBe(true);
    expect(containsAll(source, 'b')).toBe(true);
    expect(containsAll(source, 'c')).toBe(true);
    expect(containsAll(source, 'ab')).toBe(true);
    expect(containsAll(source, 'ac')).toBe(true);
    expect(containsAll(source, 'bc')).toBe(true);
    expect(containsAll(source, 'abc')).toBe(true);
    expect(containsAll(source, 'd')).toBe(false);
    expect(containsAll(source, 'A')).toBe(false);
    expect(containsAll(source, 'B')).toBe(false);
    expect(containsAll(source, 'C')).toBe(false);
    expect(containsAll(source, 'AB')).toBe(false);
    expect(containsAll(source, 'AC')).toBe(false);
    expect(containsAll(source, 'BC')).toBe(false);
    expect(containsAll(source, 'ABC')).toBe(false);
  });

  it('should check whether source contains given items using specified equality comparator', function() {
    const source = ['a', 'b', 'c'];

    expect(containsAll(source, 'a', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'b', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'c', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'ab', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'ac', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'bc', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'abc', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'd', IgnoreCaseEquals)).toBe(false);
    expect(containsAll(source, 'A', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'B', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'C', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'AB', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'AC', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'BC', IgnoreCaseEquals)).toBe(true);
    expect(containsAll(source, 'ABC', IgnoreCaseEquals)).toBe(true);
  });
});
