import { argument } from '@monument/assert';

/**
 * @author Alex Chugaev
 * @since 0.16.0
 */
export function randomInt(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER): number {
  argument(min < max);

  return Math.floor(min + Math.random() * (max - min));
}
