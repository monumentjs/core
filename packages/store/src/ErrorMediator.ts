import { Subscription } from 'rxjs';
import { Disposable } from '@monument/core';
import { Errors } from './Errors';
import { CatchDecorator } from './CatchDecorator';

/**
 * Represents mediator between actions stream and error handlers.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export class ErrorMediator implements Disposable {
  private readonly _subscriptions: Subscription[] = [];

  /**
   * Initializes new instance.
   * @param errors Errors stream
   * @param handlers Instances of error handlers
   * @since 0.11.0
   * @author Alex Chugaev
   */
  constructor(errors: Errors, handlers: object[]) {
    for (const handler of handlers) {
      for (const decorator of CatchDecorator.ofInstance(handler)) {
        const subscription = errors.ofType(decorator.errorType).subscribe(error => {
          (handler as any)[decorator.methodName](error);
        });

        this._subscriptions.push(subscription);
      }
    }
  }

  dispose() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
