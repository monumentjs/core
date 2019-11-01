import { zip } from '../../../src/operators/zip';

describe('zip()', function() {
  it('should produce sequence of results and maintain on-demand evaluation', function() {
    const sourceA = ['a', 'b'];
    const sourceB = ['C', 'D', 'E'];
    const result = zip(sourceA, sourceB, (a, b) => a + b);

    expect([...result]).toEqual(['aC', 'bD']);

    sourceA.push('c', 'd', 'e');
    sourceB.unshift('A', 'B');

    expect([...result]).toEqual(['aA', 'bB', 'cC', 'dD', 'eE']);
  });
});
