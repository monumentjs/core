import { filter } from '../../../src/operators/filter';
import { isEven } from '../../util/isEven';
import { isOdd } from '../../util/isOdd';

describe('filter()', function() {
  it('should yield items matching predicate', function() {
    const source = [1, 2, 3];
    const evens = filter(source, isEven);
    const odds = filter(source, isOdd);

    expect([...evens]).toEqual([2]);
    expect([...odds]).toEqual([1, 3]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const _isEven = jest.fn(isEven);
    const _isOdd = jest.fn(isOdd);

    const source = [1, 2, 3];
    const evens = filter(source, _isEven);
    const odds = filter(source, _isOdd);

    expect(_isEven).toHaveBeenCalledTimes(0);
    expect(_isOdd).toHaveBeenCalledTimes(0);

    expect([...evens]).toEqual([2]);
    expect([...odds]).toEqual([1, 3]);

    expect(_isEven).toHaveBeenCalledTimes(3);
    expect(_isOdd).toHaveBeenCalledTimes(3);

    source.push(4, 5);

    expect(_isEven).toHaveBeenCalledTimes(3);
    expect(_isOdd).toHaveBeenCalledTimes(3);

    expect([...evens]).toEqual([2, 4]);
    expect([...odds]).toEqual([1, 3, 5]);

    expect(_isEven).toHaveBeenCalledTimes(8);
    expect(_isOdd).toHaveBeenCalledTimes(8);
  });

  it('should narrow type of result', function() {
    const source: Array<string | number> = [1, 2, '3'];
    const result: Iterable<number> = filter(source, val => (typeof val === 'number'));

    expect([...result]).toEqual([1, 2]);
  });
});
