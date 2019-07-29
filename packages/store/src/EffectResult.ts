import { Observable } from 'rxjs';
import { Action } from './Action';

/**
 * Represents effect result.
 * @param P Payload type
 * @since 0.0.1
 * @author Alex Chugaev
 */
export type EffectResult<P = any> =
  void
  | Action<P>
  | Array<Action<P>>
  | Promise<void | Action<P> | Array<Action<P>>>
  | Observable<Action<P>>;
