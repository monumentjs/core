import { BehaviorSubject, Observable } from 'rxjs';
import { Action } from './Action';
import { Actions } from './Actions';
import { Effect } from './Effect';
import { EffectDefMap } from './EffectDefMap';
import { EffectMapAdapter } from './EffectMapAdapter';
import { EffectResult } from './EffectResult';

export abstract class Store<TState, TAction extends Action = Action> {
  private readonly _actions: Actions;
  private readonly _state: BehaviorSubject<TState>;
  private _snapshot: TState;

  get state(): Observable<TState> {
    return this._state;
  }

  get snapshot(): TState {
    return this._snapshot;
  }

  constructor(actions: Actions) {
    this._snapshot = this.getInitialState();
    this._state = new BehaviorSubject(this._snapshot);
    this._actions = actions;

    actions.subscribe((action: Action) => {
      this.onAction(action as TAction);
    });

    this.useEffects(this.getEffects(actions, this._state));
  }

  protected abstract getInitialState(): TState;

  protected getEffects(actions: Actions, state: Observable<TState>): EffectDefMap {
    return {};
  }

  protected abstract getNextState(currentState: TState, action: TAction): TState;

  private useEffects(effectDefMap: EffectDefMap) {
    const effectMapAdapter: EffectMapAdapter = new EffectMapAdapter(effectDefMap);

    for (const effect of Object.values(effectMapAdapter)) {
      effect.get().subscribe((result: EffectResult) => {
        this.onEffect(effect, result);
      });
    }
  }

  private onAction(action: TAction): void {
    const currentState: TState = this._state.value;
    const nextState: TState = this.getNextState(currentState, action);

    if (nextState !== currentState) {
      this._snapshot = nextState;
      this._state.next(nextState);
    }
  }

  private onEffect(effect: Effect, result: EffectResult): void {
    if (effect.dispatch) {
      if (result) {
        if (result instanceof Array) {
          for (const action of result) {
            this._actions.next(action);
          }
        } else if (result instanceof Promise) {
          result.then(_result => {
            this.onEffect(effect, _result);
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
