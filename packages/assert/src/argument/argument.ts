import { InvalidArgumentException } from './InvalidArgumentException';

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

export function argument(expression: boolean, message?: string): void | never {
  if (!expression) {
    throw makeException(message);
  }
}

function makeException(message?: string): InvalidArgumentException {
  switch (typeof message) {
    case 'undefined':
      return new InvalidArgumentException('Expression resolved to false');
    case 'string':
      return new InvalidArgumentException(message);
  }
}
