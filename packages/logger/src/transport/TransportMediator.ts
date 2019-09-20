import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Actions } from '@monument/store';
import { LOG, LogAction } from '../core/LogAction';
import { Disposable, Transport } from '@monument/contracts';

/**
 * Represents actions stream and transports mediator.
 * @see Transport
 * @see Actions
 * @see LogEvent
 * @see LogAction
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class TransportMediator implements Disposable {
  private readonly _subscriptions: Subscription[];

  /**
   * Initializes new instance.
   * @param actions Actions stream
   * @param transports Log event transports
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(actions: Actions, transports: ReadonlyArray<Transport>) {
    this._subscriptions = transports.map(transport => {
      return actions
        .ofType<LogAction>(LOG)
        .pipe(map(action => action.event))
        .subscribe(transport);
    });
  }

  /**
   * Disposes this instance.
   * @see Disposable
   * @since 0.14.0
   * @author Alex Chugaev
   */
  dispose() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
