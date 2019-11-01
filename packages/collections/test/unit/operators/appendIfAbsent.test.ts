import { appendIfAbsent } from '../../../src/operators/appendIfAbsent';

describe('appendIfAbsent()', function() {
  it('should add items to the end is it absent', function() {
    expect([...appendIfAbsent([], 1)]).toEqual([1]);
    expect([...appendIfAbsent([1], 1)]).toEqual([1]);
    expect([...appendIfAbsent([1, 2], 3)]).toEqual([1, 2, 3]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const src: Array<number> = [];
    const result: Iterable<number> = appendIfAbsent(src, 2);

    expect([...result]).toEqual([2]);

    src.push(1);

    expect([...result]).toEqual([1, 2]);

    src.push(2);

    expect([...result]).toEqual([1, 2]);
  });
});
