import { randomInt } from '../..';
import { InvalidArgumentException } from '@monument/assert';

describe('randomInt()', function() {
  it.each`
    from    | to
    ${-100} | ${0}
    ${0}    | ${100}
    ${-100} | ${100}
  `('should generate random value in range [$from, $to]', function({ from, to }) {
    for (let i = 0; i < 100; i++) {
      const value = randomInt(from, to);

      expect(value).toBeGreaterThanOrEqual(from);
      expect(value).toBeLessThanOrEqual(to);
    }
  });

  it.each`
    from    | to
    ${0}    | ${0}
    ${-0}   | ${-0}
    ${0}    | ${-0}
    ${-0}   | ${0}
    ${-100} | ${-100}
    ${100}  | ${100}
    ${100}  | ${99}
    ${0}    | ${-1}
  `('should throw error when range is not valid, when from=$from; to=$to', function({ from, to }) {
    for (let i = 0; i < 100; i++) {
      expect(() => randomInt(from, to)).toThrow(InvalidArgumentException);
    }
  });
});
