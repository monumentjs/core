import { BehaviorSubject, Observable } from 'rxjs';
import { Action } from './Action';
import { Actions } from './Actions';
import { EffectResult } from './EffectResult';
import { Supplier } from '@monument/core';
import { EffectsSource } from './EffectsSource';
import { EffectDeclaration } from './EffectDeclaration';

export abstract class Store<TState, TAction extends Action = Action> {
  private readonly _actions: Actions;
  private readonly _initialStateSupplier: Supplier<TState>;
  private readonly _state: BehaviorSubject<TState>;
  private _snapshot: TState;

  get state(): Observable<TState> {
    return this._state;
  }

  get snapshot(): TState {
    return this._snapshot;
  }

  constructor(actions: Actions, initialStateSupplier: Supplier<TState>, ...effectInstances: object[]) {
    this._initialStateSupplier = initialStateSupplier;
    this._snapshot = initialStateSupplier.get();
    this._state = new BehaviorSubject(this._snapshot);
    this._actions = actions;

    actions.subscribe((action: Action) => this.onAction(action as TAction));

    for (const instance of effectInstances) {
      const source = new EffectsSource(instance);

      for (const declaration of source.declarations) {
        const effect: Observable<EffectResult> = (source.instance as any)[declaration.property];

        effect.subscribe(result => this.onEffect(declaration, result));
      }
    }
  }

  protected abstract getNextState(currentState: TState, action: TAction): TState;

  private onAction(action: TAction): void {
    const currentState: TState = this._state.value;
    const nextState: TState = this.getNextState(currentState, action);

    if (nextState !== currentState) {
      this._snapshot = nextState;
      this._state.next(nextState);
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
