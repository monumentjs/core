import { map } from '../../../src/operators/map';

describe('map()', function() {
  it('should project source items into another values and maintain on-demand evaluation evaluation', function() {
    const source = ['a', 'b', 'c'];
    const result = map(source, s => s.toUpperCase());

    expect([...result]).toEqual(['A', 'B', 'C']);

    source.push('D');

    expect([...result]).toEqual(['A', 'B', 'C', 'D']);
  });
});
