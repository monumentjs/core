import { prepend } from '../../../src/operators/prepend';

describe('prepend()', function() {
  it('should add item before source', function() {
    expect([...prepend([], 1)]).toEqual([1]);
    expect([...prepend([1], 2)]).toEqual([2, 1]);
    expect([...prepend([1, 2], 3)]).toEqual([3, 1, 2]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const source: Array<number> = [];
    const result: Iterable<number> = prepend(source, 3);

    expect([...result]).toEqual([3]);

    source.push(1);

    expect([...result]).toEqual([3, 1]);

    source.push(2);

    expect([...result]).toEqual([3, 1, 2]);
  });
});
