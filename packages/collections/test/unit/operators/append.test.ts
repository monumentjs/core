import { append } from '../../../src/operators/append';

describe('append()', function() {
  it('should add item to the end', function() {
    expect([...append([], 1)]).toEqual([1]);
    expect([...append([1], 2)]).toEqual([1, 2]);
    expect([...append([1, 2], 3)]).toEqual([1, 2, 3]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const source: Array<number> = [];
    const result: Iterable<number> = append(source, 3);

    expect([...result]).toEqual([3]);

    source.push(1);

    expect([...result]).toEqual([1, 3]);

    source.push(2);

    expect([...result]).toEqual([1, 2, 3]);

  });
});
