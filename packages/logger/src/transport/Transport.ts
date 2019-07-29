import { Disposable } from '@monument/core';
import { Actions, ofType } from '@monument/store';
import { Subscription } from 'rxjs';
import { Filter } from '../filter/Filter';
import { Layout } from '../layout/Layout';
import { LogAction, LOG } from '../core/LogAction';
import { LogEvent } from '../core/LogEvent';

/**
 * Represents transport of log events.
 * @see LogAction
 * @see Layout
 * @see Filter
 * @since 0.0.1
 * @author Alex Chugaev
 */
export abstract class Transport implements Disposable {
  private readonly _subscription: Subscription;

  constructor(actions: Actions, readonly layout: Layout, readonly filters: Filter[] = []) {
    this._subscription = actions.pipe(ofType<LogAction>(LOG)).subscribe(action => {
      const accept: boolean =
        filters.length === 0 ||
        filters.every(filter => {
          return filter.filter(action.payload) ? filter.onMatch : filter.onMismatch;
        });

      if (accept) {
        this.send(action.payload);
      }
    });
  }

  dispose(): void {
    this._subscription.unsubscribe();
  }

  protected abstract send(action: LogEvent): void;
}
