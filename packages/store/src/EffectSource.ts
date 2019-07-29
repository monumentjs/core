import { Observable } from 'rxjs';
import { EffectResult } from './EffectResult';

export type EffectSource = Observable<EffectResult>;
