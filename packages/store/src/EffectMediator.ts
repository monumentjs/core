import { Observable, Subscription } from 'rxjs';
import { Disposable } from '@monument/contracts';
import { EffectDecorator } from './EffectDecorator';
import { Actions } from './Actions';
import { EffectSource } from './EffectSource';
import { EffectResult } from './EffectResult';

/**
 * Represents mediator between actions stream and effect classes.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export class EffectMediator implements Disposable {
  private readonly _actions: Actions;
  private readonly _subscriptions: Subscription[] = [];

  /**
   * Initializes new instance.
   * @param actions Actions stream
   * @param effects Instances of effect classes
   * @since 0.11.0
   * @author Alex Chugaev
   */
  constructor(actions: Actions, effects: object[]) {
    this._actions = actions;

    for (const instance of effects) {
      for (const decorator of EffectDecorator.ofInstance(instance)) {
        const source: EffectSource = (instance as any)[decorator.property];
        const subscription: Subscription = source.subscribe(result => this.onEffect(decorator, result));

        this._subscriptions.push(subscription);
      }
    }
  }

  dispose(): void {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

  private onEffect(decorator: EffectDecorator, result: EffectResult): void {
    if (decorator.dispatch) {
      if (result) {
        if (result instanceof Array) {
          for (const action of result) {
            this._actions.next(action);
          }
        } else if (result instanceof Promise) {
          result.then(_result => {
            this.onEffect(decorator, _result);
          });
        } else if (result instanceof Observable) {
          result.subscribe(action => {
            this._actions.next(action);
          });
        } else {
          this._actions.next(result);
        }
      }
    }
  }
}
