import { Observable } from 'rxjs';
import { EffectResult } from './EffectResult';

/**
 * Represents stream of effect results.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export type EffectSource = Observable<EffectResult>;
