import { Observable } from 'rxjs';
import { Action } from './Action';

/**
 * Represents effect result.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export type EffectResult =
  void
  | Action
  | Action[]
  | Promise<void | Action | Action[]>
  | Observable<Action>;
