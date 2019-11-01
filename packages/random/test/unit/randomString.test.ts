import { ALPHA_NUMERIC_CHARSET, ALPHABETIC_CHARSET, HEX_CHARSET, NUMERIC_CHARSET, randomString } from '../..';

describe('randomString()', function() {
  it.each`
      length  | charset
      ${0}    | ${ALPHA_NUMERIC_CHARSET}
      ${5}    | ${NUMERIC_CHARSET}
      ${5}    | ${ALPHABETIC_CHARSET}
      ${5}    | ${ALPHA_NUMERIC_CHARSET}
      ${5}    | ${HEX_CHARSET}
    `('should generate random string of length=$length using charset="$charset"', function({ length, charset }) {
    const value: string = randomString(length, charset);

    expect(value.length).toBe(length);
  });
});
