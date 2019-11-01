import { skipWhile } from '../../../src/operators/skipWhile';

describe('skipWhile()', function() {
  it('should skip items until predicate returns true and maintain on-demand evaluation', function() {
    const source: Array<string> = [];
    const result = skipWhile(source, s => s.length === 3);

    expect([...result]).toEqual([]);

    source.push('one', 'two', 'three');

    expect([...result]).toEqual(['three']);

    source.push('four', 'five', 'six');

    expect([...result]).toEqual(['three', 'four', 'five', 'six']);

    source.push('seven', 'eight', 'nine', 'ten', 'eleven');

    expect([...result]).toEqual(['three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']);
  });
});
