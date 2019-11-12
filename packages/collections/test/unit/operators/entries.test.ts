import { entries } from '../../../src/operators/entries';

describe('entries()', function() {
  it('should yield entries as key-value pairs', function() {
    const source: Array<string> = ['a', 'aa', 'aaa'];
    const result = entries(source);

    expect([...result]).toEqual([
      [1, 'a'],
      [2, 'aa'],
      [3, 'aaa']
    ]);
  });

  it('should maintain on-demand evaluation evaluation', function() {
    const source: Array<string> = [];
    const result = entries(source);

    expect([...result]).toEqual([]);

    source.push('a');

    expect([...result]).toEqual([
      [0, 'a']
    ]);

    source.push('aa');

    expect([...result]).toEqual([
      [0, 'a'],
      [1, 'aa']
    ]);

    source.push('aaa');

    expect([...result]).toEqual([
      [0, 'a'],
      [1, 'aa'],
      [2, 'aaa']
    ]);
  });
});
