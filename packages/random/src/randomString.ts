import { argument } from '@monument/assert';
import { randomInt } from './randomInt';

export const NUMERIC_CHARSET: string = '1234567890';
export const ALPHABETIC_CHARSET: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
export const ALPHA_NUMERIC_CHARSET: string = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
export const HEX_CHARSET: string = '1234567890ABCDEF';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export function randomString(length: number, charset: string): string {
  argument(length >= 0, 'Char sequence length cannot be negative');
  argument(charset.length > 0, 'Charset cannot be empty');

  let value = '';

  for (let i = 0; i < length; i++) {
    value += charset.charAt(randomInt(0, charset.length));
  }

  return value;
}
