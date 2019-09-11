import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Type } from '@monument/core';
import { OperationNotSupportedException } from '@monument/exceptions';


/**
 * Represents stream of errors.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export class Errors extends Subject<Error> {
  /**
   * Narrows stream to receive only errors of specific types.
   * @param types Required errors types
   * @since 0.11.0
   * @author Alex Chugaev
   */
  ofType<TError extends Error>(...types: Array<Type<TError>>): Observable<TError> {
    return this.pipe(
      filter((error: Error) => types.some(type => error instanceof type))
    ) as Observable<TError>;
  }

  complete(): void {
    throw new OperationNotSupportedException('Errors stream cannot be complete');
  }

  error(err: any): void {
    throw new OperationNotSupportedException('Errors stream cannot throw errors', err);
  }
}
