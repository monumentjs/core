import { appendAll } from '../../../src/operators/appendAll';

describe('appendAll()', function() {
  it('should add items to the end', function() {
    expect([...appendAll([], [1, 2])]).toEqual([1, 2]);
    expect([...appendAll([1], [2, 3])]).toEqual([1, 2, 3]);
    expect([...appendAll([1, 2], [3, 4])]).toEqual([1, 2, 3, 4]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const src: Array<number> = [];
    const result: Iterable<number> = appendAll(src, [3, 4]);

    expect([...result]).toEqual([3, 4]);

    src.push(1);

    expect([...result]).toEqual([1, 3, 4]);

    src.push(2);

    expect([...result]).toEqual([1, 2, 3, 4]);
  });
});
