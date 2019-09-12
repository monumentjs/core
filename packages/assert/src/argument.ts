import { SupplyFunction } from '@monument/core';
import { InvalidArgumentException } from '@monument/exceptions';

/**
 * Tests expression resolves to `true`.
 * If it resolves to `false`, then throws {@link InvalidArgumentException}.
 * @param expression Expression evaluation result
 * @throws {InvalidArgumentException} if expression resolves to `false`
 * @since 1.1.0
 * @author Alex Chugaev
 */
export function argument(expression: boolean): void | never;

/**
 * Tests expression resolves to `true`.
 * If it resolves to `false`, then throws {@link InvalidArgumentException}.
 * @param expression Expression evaluation result
 * @param message Message
 * @throws {InvalidArgumentException} if expression resolves to `false`
 * @since 1.1.0
 * @author Alex Chugaev
 */
export function argument(expression: boolean, message: string): void | never;

/**
 * Tests expression resolves to `true`.
 * If it resolves to `false`, then throws {@link InvalidArgumentException}.
 * @param expression Expression evaluation result
 * @param message Message supplier
 * @throws {InvalidArgumentException} if expression resolves to `false`
 * @since 1.1.0
 * @author Alex Chugaev
 */
export function argument(expression: boolean, message: SupplyFunction<string>): void | never;

export function argument(expression: boolean, message?: string | SupplyFunction<string>): void | never {
  if (!expression) {
    throw makeException(message);
  }
}

function makeException(message?: string | SupplyFunction<string>): InvalidArgumentException {
  switch (typeof message) {
    case 'undefined':
      return new InvalidArgumentException('Expression resolved to false');
    case 'string':
      return new InvalidArgumentException(message);
    case 'function':
      return new InvalidArgumentException(message());
  }
}
