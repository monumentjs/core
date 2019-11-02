import { randomFloat } from '../..';

describe('randomFloat()', function() {
  it.each`
      from    | to
      ${-100} | ${0}
      ${0}    | ${100}
      ${-100} | ${100}
    `('should generate random value in range [$from, $to]', function({ from, to }) {
    for (let i = 0; i < 100; i++) {
      const value = randomFloat(from, to);

      expect(value).toBeGreaterThanOrEqual(from);
      expect(value).toBeLessThanOrEqual(to);
    }
  });
});
