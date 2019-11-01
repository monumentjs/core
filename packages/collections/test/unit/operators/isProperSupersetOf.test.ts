import { isProperSupersetOf } from '../../../src/operators/isProperSupersetOf';

describe('isProperSupersetOf()', function() {
  it('should determine whether current set is proper superset of other set', function() {
    expect(isProperSupersetOf([], [])).toBe(true);
    expect(isProperSupersetOf([], [1])).toBe(false);
    expect(isProperSupersetOf([1], [])).toBe(true);
    expect(isProperSupersetOf([1, 2], [])).toBe(true);
    expect(isProperSupersetOf([1, 2, 3], [])).toBe(true);
    expect(isProperSupersetOf([1, 2, 3, 4], [])).toBe(true);
    expect(isProperSupersetOf([1, 2, 3, 4], [1])).toBe(true);
    expect(isProperSupersetOf([1, 2, 3, 4], [1, 2])).toBe(true);
    expect(isProperSupersetOf([1, 2, 3, 4], [1, 2, 3])).toBe(true);
    expect(isProperSupersetOf([1, 2, 3, 4], [1, 2, 3, 4])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [1, 2, 3, 4, 5])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [1, 2, 3, 4, 5, 6])).toBe(false);

    expect(isProperSupersetOf([1, 2, 3, 4], [3, 4, 1, 2, 5])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [3, 4, 1, 2, 4])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [3, 4, 1, 2])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [1, 2, 3, 4, 4])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [1, 2, 3, 3, 4])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [1, 2, 3, 3, 4, 4, 1])).toBe(false);

    expect(isProperSupersetOf([1, 2, 3, 4], [5])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [5, 6])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [5, 6, 7])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [5, 6, 7, 8])).toBe(false);
    expect(isProperSupersetOf([1, 2, 3, 4], [5, 6, 7, 8, 9])).toBe(false);
  });
});
