import { IgnoreCaseEquals } from '@monument/comparison';
import { retainAll } from '../../../src/operators/retainAll';

describe('retainAll()', function() {
  it('should leave only items matching examples and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const examples: Array<string> = [];
    const result = retainAll(source, examples, IgnoreCaseEquals);

    expect([...result]).toEqual([]);

    source.push('a', 'b', 'c');

    expect([...result]).toEqual([]);

    examples.push('A', 'B');

    expect([...result]).toEqual(['a', 'b']);
  });
});
