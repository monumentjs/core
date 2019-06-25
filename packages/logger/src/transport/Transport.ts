import { Disposable } from '@monument/core';
import { Actions } from '@monument/store';
import { Subscription } from 'rxjs';
import { Filter } from '../filter/Filter';
import { Layout } from '../layout/Layout';
import { LogEvent, LOG_EVENT } from '../core/LogEvent';

/**
 * Represents transport of log events.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see LogEvent
 * @see Layout
 * @see Filter
 */
export abstract class Transport implements Disposable {
  private readonly _subscription: Subscription;

  constructor(actions: Actions, readonly layout: Layout, readonly filters: Filter[] = []) {
    this._subscription = actions.ofType<LogEvent>(LOG_EVENT).subscribe(action => {
      const accept: boolean =
        filters.length === 0 ||
        filters.every(filter => {
          return filter.filter(action) ? filter.onMatch : filter.onMismatch;
        });

      if (accept) {
        this.send(action);
      }
    });
  }

  dispose(): void {
    this._subscription.unsubscribe();
  }

  protected abstract send(action: LogEvent): void;
}
