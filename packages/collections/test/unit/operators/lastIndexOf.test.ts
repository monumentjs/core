import { InvalidArgumentException } from '@monument/assert';
import { IgnoreCaseEquals, StrictEquals } from '@monument/comparison';
import { lastIndexOf } from '../../../src/operators/lastIndexOf';

describe('lastIndexOf()', function() {
  it('should find last index of item in source', function() {
    const source = 'hello world';

    expect(lastIndexOf(source, 'h')).toBe(0);
    expect(lastIndexOf(source, 'e')).toBe(1);
    expect(lastIndexOf(source, 'l')).toBe(9);
    expect(lastIndexOf(source, 'o')).toBe(7);
    expect(lastIndexOf(source, 'H')).toBe(undefined);
    expect(lastIndexOf(source, 'E')).toBe(undefined);
    expect(lastIndexOf(source, 'L')).toBe(undefined);
    expect(lastIndexOf(source, 'O')).toBe(undefined);
  });

  it('should find last index of item in source using custom equality comparer', function() {
    const source = 'hello world';

    expect(lastIndexOf(source, 'h', IgnoreCaseEquals)).toBe(0);
    expect(lastIndexOf(source, 'e', IgnoreCaseEquals)).toBe(1);
    expect(lastIndexOf(source, 'l', IgnoreCaseEquals)).toBe(9);
    expect(lastIndexOf(source, 'o', IgnoreCaseEquals)).toBe(7);
    expect(lastIndexOf(source, 'H', IgnoreCaseEquals)).toBe(0);
    expect(lastIndexOf(source, 'E', IgnoreCaseEquals)).toBe(1);
    expect(lastIndexOf(source, 'L', IgnoreCaseEquals)).toBe(9);
    expect(lastIndexOf(source, 'O', IgnoreCaseEquals)).toBe(7);
  });

  it('should find last index of item in source starting from given position', function() {
    const source = 'hello world';

    expect(lastIndexOf(source, 'h', StrictEquals, 0)).toBe(0);
    expect(lastIndexOf(source, 'h', StrictEquals, 1)).toBe(undefined);
    expect(lastIndexOf(source, 'H', IgnoreCaseEquals, 0)).toBe(0);
    expect(lastIndexOf(source, 'H', IgnoreCaseEquals, 1)).toBe(undefined);
    expect(lastIndexOf(source, 'l', StrictEquals, 0)).toBe(9);
    expect(lastIndexOf(source, 'l', StrictEquals, 2)).toBe(9);
    expect(lastIndexOf(source, 'l', StrictEquals, 3)).toBe(9);
    expect(lastIndexOf(source, 'l', StrictEquals, 4)).toBe(9);
    expect(lastIndexOf(source, 'L', StrictEquals, 0)).toBe(undefined);
    expect(lastIndexOf(source, 'L', StrictEquals, 2)).toBe(undefined);
    expect(lastIndexOf(source, 'L', StrictEquals, 3)).toBe(undefined);
    expect(lastIndexOf(source, 'L', StrictEquals, 4)).toBe(undefined);
    expect(lastIndexOf(source, 'L', IgnoreCaseEquals, 0)).toBe(9);
    expect(lastIndexOf(source, 'L', IgnoreCaseEquals, 2)).toBe(9);
    expect(lastIndexOf(source, 'L', IgnoreCaseEquals, 3)).toBe(9);
    expect(lastIndexOf(source, 'L', IgnoreCaseEquals, 4)).toBe(9);
  });

  it('should find last index of item in specified range of source', function() {
    const source = 'hello world';

    expect(lastIndexOf(source, 'h', StrictEquals, 0, 5)).toBe(0);
    expect(lastIndexOf(source, 'e', StrictEquals, 0, 5)).toBe(1);
    expect(lastIndexOf(source, 'l', StrictEquals, 0, 5)).toBe(3);
    expect(lastIndexOf(source, 'o', StrictEquals, 0, 5)).toBe(4);
    expect(lastIndexOf(source, ' ', StrictEquals, 0, 5)).toBe(undefined);

    expect(lastIndexOf(source, 'h', StrictEquals, 5, 5)).toBe(undefined);
    expect(lastIndexOf(source, 'e', StrictEquals, 5, 5)).toBe(undefined);
    expect(lastIndexOf(source, 'l', StrictEquals, 5, 5)).toBe(9);
    expect(lastIndexOf(source, 'w', StrictEquals, 5, 5)).toBe(6);
  });

  it('should throw if given search range is invalid', function() {
    const source = 'hello world';

    expect(() => {
      lastIndexOf(source, 'h', StrictEquals, -1, 5);
    }).toThrow(InvalidArgumentException);

    expect(() => {
      lastIndexOf(source, 'a', StrictEquals, 0, 11);
    }).not.toThrow(InvalidArgumentException);

    expect(() => {
      lastIndexOf(source, 'a', StrictEquals, 100, 11);
    }).not.toThrow(InvalidArgumentException);
  });
});
