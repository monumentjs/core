import { argument } from '@monument/assert';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export function randomFloat(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER): number {
  argument(min < max);

  return min + Math.random() * (max - min);
}
