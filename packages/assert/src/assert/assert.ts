import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AssertionException } from './AssertionException';

/**
 * Asserts expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @throws AssertionException
 * @since 1.0.0
 * @author Alex Chugaev
 */
export function assert(expression: boolean): void | never;

/**
 * Asserts expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @param error Error message
 * @throws AssertionException
 * @since 1.0.0
 * @author Alex Chugaev
 */
export function assert(expression: boolean, error: string): void | never;

/**
 * Asserts observable expression emits {@code true}.
 * @param expression Expression evaluation result
 * @throws AssertionException
 * @since 1.0.0
 * @author Alex Chugaev
 */
export function assert(expression: Observable<boolean>): Observable<void | never>;

/**
 * Asserts observable expression emits {@code true}.
 * @param expression Expression evaluation result
 * @param message Message
 * @throws AssertionException
 * @since 1.0.0
 * @author Alex Chugaev
 */
export function assert(expression: Observable<boolean>, message: string): Observable<void | never>;

/**
 * Asserts async expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @throws AssertionException
 * @since 1.0.0
 * @author Alex Chugaev
 */
export function assert(expression: Promise<boolean>): Promise<void | never>;

/**
 * Asserts async expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @param message Message
 * @throws AssertionException
 * @since 1.0.0
 * @author Alex Chugaev
 */
export function assert(expression: Promise<boolean>, message: string): Promise<void | never>;

export function assert(expression: boolean | Observable<boolean> | Promise<boolean>, message?: string): void | never | Observable<void | never> | Promise<void | never> {
  switch (typeof expression) {
    case 'boolean':
      if (!expression) {
        throw makeException(message);
      }
      break;
    case 'object':
      if (expression instanceof Promise) {
        return expression.then(value => {
          if (!value) {
            throw makeException(message);
          }
        });
      } else {
        return expression.pipe(
          mergeMap(value => value ? of(undefined) : throwError(makeException(message)))
        );
      }
  }
}

function makeException(message?: string): AssertionException {
  switch (typeof message) {
    case 'undefined':
      return new AssertionException('Expression resolved to false');
    case 'string':
      return new AssertionException(message);
  }
}
