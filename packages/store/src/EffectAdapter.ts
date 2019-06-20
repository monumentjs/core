import { SupplyFunction } from '@monument/core';
import { Observable } from 'rxjs';
import { Effect } from './Effect';
import { EffectResult } from './EffectResult';
import { EffectDef } from './EffectDef';

export class EffectAdapter implements Effect {
  readonly dispatch: boolean;
  get: SupplyFunction<Observable<EffectResult>>;

  constructor(effectDef: EffectDef) {
    if (typeof effectDef === 'object') {
      this.dispatch = effectDef.dispatch;
      this.get = () => effectDef.get();
    } else {
      this.dispatch = true;
      this.get = effectDef;
    }
  }
}
