import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Disposable } from '@monument/core';
import { Actions } from './Actions';
import { ReactionDecorator } from './ReactionDecorator';
import { State } from '@monument/contracts';

/**
 * Represents store of the state.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export abstract class Store<TSnapshot, TState extends State<TSnapshot>> implements Disposable {
  private readonly _snapshot: BehaviorSubject<TSnapshot>;
  private readonly _subscriptions: Subscription[] = [];

  /**
   * Gets instant state snapshot.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  get snapshot(): TSnapshot {
    return this._snapshot.value;
  }

  /**
   * Gets stream of state snapshots.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  get stream(): Observable<TSnapshot> {
    return this._snapshot;
  }

  /**
   * Initializes new instance.
   * @param actions Stream of actions
   * @param state State implementation
   * @since 0.11.0
   * @author Alex Chugaev
   */
  constructor(actions: Actions, state: TState) {
    this._snapshot = new BehaviorSubject(state.getSnapshot());

    for (const decorator of ReactionDecorator.ofInstance(state)) {
      const subscription: Subscription = actions.ofType(decorator.actionType).subscribe(action => {
        (state as any)[decorator.methodName](action);
        this._snapshot.next(state.getSnapshot());
      });

      this._subscriptions.push(subscription);
    }
  }

  dispose(): void {
    this._snapshot.complete();

    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
