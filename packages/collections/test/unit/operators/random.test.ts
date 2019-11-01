import { random } from '../../../src/operators/random';

describe('random()', function() {
  it('should return random item of source', function() {
    const source = ['One', 'Two', 'Three'];

    expect(random(source, () => 0)).toBe('One');
    expect(random(source, () => 1)).toBe('Two');
    expect(random(source, () => 2)).toBe('Three');
  });
});
