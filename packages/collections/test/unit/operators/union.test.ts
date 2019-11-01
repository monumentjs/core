import { IgnoreCaseEquals } from '@monument/comparison';
import { union } from '../../../src/operators/union';

describe('union()', function() {
  it('should produce union of sources and maintain on-demand evaluation', function() {
    const sourceA: Array<string> = ['a', 'b', 'c'];
    const sourceB: Array<string> = ['c', 'a', 'd'];
    const result = union(sourceA, sourceB, IgnoreCaseEquals);

    expect([...result]).toEqual(['a', 'b', 'c', 'd']);

    sourceA.push('D', 'E');
    sourceB.push('e', 'd', 'f');

    expect([...result]).toEqual(['a', 'b', 'c', 'D', 'E', 'f']);
  });
});
