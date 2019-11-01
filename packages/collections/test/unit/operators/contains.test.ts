import { contains } from '../../../src/operators/contains';
import { IgnoreCaseEquals } from '@monument/comparison';

describe('contains()', function() {
  it('should check whether source contains given item', function() {
    const source = ['a', 'b', 'c'];

    expect(contains(source, 'a')).toBe(true);
    expect(contains(source, 'b')).toBe(true);
    expect(contains(source, 'c')).toBe(true);
    expect(contains(source, 'd')).toBe(false);
    expect(contains(source, 'A')).toBe(false);
    expect(contains(source, 'B')).toBe(false);
    expect(contains(source, 'C')).toBe(false);
  });

  it('should check whether source contains given item using specified equality comparator', function() {
    const source = ['a', 'b', 'c'];

    expect(contains(source, 'a', IgnoreCaseEquals)).toBe(true);
    expect(contains(source, 'b', IgnoreCaseEquals)).toBe(true);
    expect(contains(source, 'c', IgnoreCaseEquals)).toBe(true);
    expect(contains(source, 'd', IgnoreCaseEquals)).toBe(false);
    expect(contains(source, 'A', IgnoreCaseEquals)).toBe(true);
    expect(contains(source, 'B', IgnoreCaseEquals)).toBe(true);
    expect(contains(source, 'C', IgnoreCaseEquals)).toBe(true);
  });
});
