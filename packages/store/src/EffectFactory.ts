import { Observable } from 'rxjs';
import { EffectResult } from './EffectResult';

export type EffectFactory = () => Observable<EffectResult>;
