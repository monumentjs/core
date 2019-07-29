import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Disposable } from '@monument/core';
import { ObjectChangeDetectionProxy } from './proxy/ObjectChangeDetectionProxy';
import { EffectManager } from './decorator/effect/EffectManager';
import { EffectDeclaration } from './decorator/effect/EffectDeclaration';
import { ReactionManager } from './decorator/reaction/ReactionManager';
import { Actions, ofType } from './Actions';
import { EffectResult } from './EffectResult';
import { EffectSource } from './EffectSource';

export interface StoreConfiguration<TState extends Object, TSnapshot extends Object> {
  readonly actions: Actions;
  readonly state: TState;
  readonly effects: object[];

  takeSnapshot(state: TState): TSnapshot;
}

export abstract class Store<TState extends Object, TSnapshot extends Object> implements Disposable {
  private readonly _actions: Actions;
  private readonly _snapshot: BehaviorSubject<TSnapshot>;
  private _effectSubscriptions: Subscription[] = [];
  private _reactionSubscriptions: Subscription[] = [];

  get snapshot(): TSnapshot {
    return this._snapshot.getValue();
  }

  get state(): Observable<TSnapshot> {
    return this._snapshot;
  }

  protected constructor({ state, actions, effects, takeSnapshot }: StoreConfiguration<TState, TSnapshot>) {
    const proxy: ObjectChangeDetectionProxy<TState> = new ObjectChangeDetectionProxy(state);
    this._actions = actions;
    this._snapshot = new BehaviorSubject<TSnapshot>(takeSnapshot(state));

    for (const declaration of ReactionManager.ofInstance(state).declarations) {
      this._reactionSubscriptions.push(actions.pipe(ofType(declaration.actionType)).subscribe(action => {
        (proxy.proxy as any)[declaration.methodName](action.payload);
        this._snapshot.next(takeSnapshot(state));
      }));
    }

    for (const instance of effects) {
      for (const declaration of EffectManager.ofInstance(instance).declarations) {
        const effectSource: EffectSource = (instance as any)[declaration.property];

        this._effectSubscriptions.push(effectSource.subscribe(result => this.onEffect(declaration, result)));
      }
    }
  }

  dispose(): void {
    this._snapshot.complete();

    for (const subscription of this._effectSubscriptions) {
      subscription.unsubscribe();
    }

    for (const subscription of this._reactionSubscriptions) {
      subscription.unsubscribe();
    }
  }

  private onEffect(declaration: EffectDeclaration, result: EffectResult): void {
    if (declaration.dispatch) {
      if (result) {
        if (result instanceof Array) {
          for (const action of result) {
            this._actions.next(action);
          }
        } else if (result instanceof Promise) {
          result.then(_result => {
            this.onEffect(declaration, _result);
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
