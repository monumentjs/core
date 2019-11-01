import { InvalidArgumentException } from '@monument/assert';
import { IgnoreCaseEquals, StrictEquals } from '@monument/comparison';
import { indexOf } from '../../../src/operators/indexOf';

describe('indexOf()', function() {
  it('should find index of item in source', function() {
    const source = 'hello world';

    expect(indexOf(source, 'h')).toBe(0);
    expect(indexOf(source, 'e')).toBe(1);
    expect(indexOf(source, 'l')).toBe(2);
    expect(indexOf(source, 'o')).toBe(4);
    expect(indexOf(source, 'H')).toBe(undefined);
    expect(indexOf(source, 'E')).toBe(undefined);
    expect(indexOf(source, 'L')).toBe(undefined);
    expect(indexOf(source, 'O')).toBe(undefined);
  });

  it('should find index of item in source using custom equality comparer', function() {
    const source = 'hello world';

    expect(indexOf(source, 'h', IgnoreCaseEquals)).toBe(0);
    expect(indexOf(source, 'e', IgnoreCaseEquals)).toBe(1);
    expect(indexOf(source, 'l', IgnoreCaseEquals)).toBe(2);
    expect(indexOf(source, 'o', IgnoreCaseEquals)).toBe(4);
    expect(indexOf(source, 'H', IgnoreCaseEquals)).toBe(0);
    expect(indexOf(source, 'E', IgnoreCaseEquals)).toBe(1);
    expect(indexOf(source, 'L', IgnoreCaseEquals)).toBe(2);
    expect(indexOf(source, 'O', IgnoreCaseEquals)).toBe(4);
  });

  it('should find index of item in source starting from given position', function() {
    const source = 'hello world';

    expect(indexOf(source, 'h', StrictEquals, 0)).toBe(0);
    expect(indexOf(source, 'h', StrictEquals, 1)).toBe(undefined);
    expect(indexOf(source, 'H', IgnoreCaseEquals, 0)).toBe(0);
    expect(indexOf(source, 'H', IgnoreCaseEquals, 1)).toBe(undefined);
    expect(indexOf(source, 'l', StrictEquals, 0)).toBe(2);
    expect(indexOf(source, 'l', StrictEquals, 2)).toBe(2);
    expect(indexOf(source, 'l', StrictEquals, 3)).toBe(3);
    expect(indexOf(source, 'l', StrictEquals, 4)).toBe(9);
    expect(indexOf(source, 'L', StrictEquals, 0)).toBe(undefined);
    expect(indexOf(source, 'L', StrictEquals, 2)).toBe(undefined);
    expect(indexOf(source, 'L', StrictEquals, 3)).toBe(undefined);
    expect(indexOf(source, 'L', StrictEquals, 4)).toBe(undefined);
    expect(indexOf(source, 'L', IgnoreCaseEquals, 0)).toBe(2);
    expect(indexOf(source, 'L', IgnoreCaseEquals, 2)).toBe(2);
    expect(indexOf(source, 'L', IgnoreCaseEquals, 3)).toBe(3);
    expect(indexOf(source, 'L', IgnoreCaseEquals, 4)).toBe(9);
  });

  it('should find index of item in specified range of source', function() {
    const source = 'hello world';

    expect(indexOf(source, 'h', StrictEquals, 0, 5)).toBe(0);
    expect(indexOf(source, 'e', StrictEquals, 0, 5)).toBe(1);
    expect(indexOf(source, 'l', StrictEquals, 0, 5)).toBe(2);
    expect(indexOf(source, 'o', StrictEquals, 0, 5)).toBe(4);
    expect(indexOf(source, ' ', StrictEquals, 0, 5)).toBe(undefined);

    expect(indexOf(source, 'h', StrictEquals, 5, 5)).toBe(undefined);
    expect(indexOf(source, 'e', StrictEquals, 5, 5)).toBe(undefined);
    expect(indexOf(source, 'l', StrictEquals, 5, 5)).toBe(9);
    expect(indexOf(source, 'w', StrictEquals, 5, 5)).toBe(6);
  });

  it('should throw if given search range is invalid', function() {
    const source = 'hello world';

    expect(() => {
      indexOf(source, 'h', StrictEquals, -1, 5);
    }).toThrow(InvalidArgumentException);

    expect(() => {
      indexOf(source, 'a', StrictEquals, 0, 11);
    }).not.toThrow(InvalidArgumentException);

    expect(() => {
      indexOf(source, 'a', StrictEquals, 0, 12);
    }).not.toThrow(InvalidArgumentException);

    expect(() => {
      indexOf(source, 'a', StrictEquals, 100, 12);
    }).not.toThrow(InvalidArgumentException);
  });
});
