import { SupplyFunction } from '@monument/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AssertionException } from './exception/AssertionException';

/**
 * Asserts expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: boolean): void | never;

/**
 * Asserts expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @param error Error message
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: boolean, error: string): void | never;

/**
 * Asserts expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @param message Message supplier
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: boolean, message: SupplyFunction<string>): void | never;

/**
 * Asserts observable expression emits {@code true}.
 * @param expression Expression evaluation result
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: Observable<boolean>): Observable<void | never>;

/**
 * Asserts observable expression emits {@code true}.
 * @param expression Expression evaluation result
 * @param message Message
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: Observable<boolean>, message: string): Observable<void | never>;

/**
 * Asserts observable expression emits {@code true}.
 * @param expression Expression evaluation result
 * @param message Message supplier
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: Observable<boolean>, message: SupplyFunction<string>): Observable<void | never>;

/**
 * Asserts async expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: Promise<boolean>): Promise<void | never>;

/**
 * Asserts async expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @param message Message
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: Promise<boolean>, message: string): Promise<void | never>;

/**
 * Asserts async expression resolves to {@code true}.
 * @param expression Expression evaluation result
 * @param message Message supplier
 * @throws AssertionException
 * @since 0.0.1
 * @author Alex Chugaev
 */
export function assert(expression: Promise<boolean>, message: SupplyFunction<string>): Promise<void | never>;

export function assert(expression: boolean | Observable<boolean> | Promise<boolean>, error?: string | SupplyFunction<string>): void | never | Observable<void | never> | Promise<void | never> {
  switch (typeof expression) {
    case 'boolean':
      if (!expression) {
        throw makeError(error);
      }
      break;
    case 'object':
      if (expression instanceof Promise) {
        return expression.then(value => {
          if (!value) {
            throw makeError(error);
          }
        });
      } else {
        return expression.pipe(
          mergeMap(value => value ? of(undefined) : throwError(makeError(error)))
        );
      }
  }
}

function makeError(error?: string | SupplyFunction<string>): Error {
  switch (typeof error) {
    case 'undefined':
      return new AssertionException('Expression resolved to false');
    case 'string':
      return new AssertionException(error);
    case 'function':
      return new AssertionException(error());
  }
}
