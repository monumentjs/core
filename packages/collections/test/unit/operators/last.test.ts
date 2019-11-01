import { last } from '../../../src/operators/last';

describe('last()', function() {
  it('should return last element matching predicate or fallback', function() {
    const source = ['one', 'two', 'three'];

    expect(last(source, s => s.length === 3)).toBe('two');
    expect(last(source, s => s.length === 4)).toBe(undefined);
    expect(last(source, s => s.length === 4, () => 'fallback')).toBe('fallback');
    expect(last(source, s => s.length === 5)).toBe('three');
    expect(last(source, s => s.length > 2)).toBe('three');
  });
});
