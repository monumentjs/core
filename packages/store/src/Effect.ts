import { Supplier } from '@monument/core';
import { Observable } from 'rxjs';
import { EffectResult } from './EffectResult';

export interface Effect extends Supplier<Observable<EffectResult>> {
  readonly dispatch: boolean;
}
