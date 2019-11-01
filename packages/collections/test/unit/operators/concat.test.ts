import { concat } from '../../../src/operators/concat';

describe('concat()', function() {
  it('should concatenate multiple sequences', function() {
    expect([...concat<number>([], [])]).toEqual([]);
    expect([...concat<number>([], [[1]])]).toEqual([1]);
    expect([...concat<number>([], [[1], [2, 3]])]).toEqual([1, 2, 3]);
    expect([...concat<number>([1, 2], [[3, 4], [5, 6]])]).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const self: Array<number> = [];
    const source1: Array<number> = [];
    const source2: Array<number> = [];
    const others: Array<Array<number>> = [source1, source2];
    const result: Iterable<number> = concat(self, others);

    expect([...result]).toEqual([]);

    self.push(1);

    expect([...result]).toEqual([1]);

    self.push(2);

    expect([...result]).toEqual([1, 2]);

    source1.push(3);

    expect([...result]).toEqual([1, 2, 3]);

    source1.push(4);

    expect([...result]).toEqual([1, 2, 3, 4]);

    source2.push(5);

    expect([...result]).toEqual([1, 2, 3, 4, 5]);

    source2.push(6);

    expect([...result]).toEqual([1, 2, 3, 4, 5, 6]);

    others.push([7, 8]);

    expect([...result]).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

  });
});
