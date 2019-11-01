import { isSupersetOf } from '../../../src/operators/isSupersetOf';

describe('isSupersetOf()', function() {
  it('should determine whether current set is subset of other set', function() {
    expect(isSupersetOf([], [])).toBe(true);
    expect(isSupersetOf([], [1])).toBe(false);
    expect(isSupersetOf([1], [])).toBe(true);
    expect(isSupersetOf([1, 2], [])).toBe(true);
    expect(isSupersetOf([1, 2, 3], [])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [1])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [1, 2])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [1, 2, 3])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [1, 2, 3, 4, 5])).toBe(false);
    expect(isSupersetOf([1, 2, 3, 4], [1, 2, 3, 4, 5, 6])).toBe(false);

    expect(isSupersetOf([1, 2, 3, 4], [3, 4, 1, 2, 5])).toBe(false);
    expect(isSupersetOf([1, 2, 3, 4], [3, 4, 1, 2, 4])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [3, 4, 1, 2])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [1, 2, 3, 4, 4])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [1, 2, 3, 3, 4])).toBe(true);
    expect(isSupersetOf([1, 2, 3, 4], [1, 2, 3, 3, 4, 4, 1])).toBe(true);

    expect(isSupersetOf([1, 2, 3, 4], [5])).toBe(false);
    expect(isSupersetOf([1, 2, 3, 4], [5, 6])).toBe(false);
    expect(isSupersetOf([1, 2, 3, 4], [5, 6, 7])).toBe(false);
    expect(isSupersetOf([1, 2, 3, 4], [5, 6, 7, 8])).toBe(false);
    expect(isSupersetOf([1, 2, 3, 4], [5, 6, 7, 8, 9])).toBe(false);
  });
});
