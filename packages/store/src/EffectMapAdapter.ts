import { EffectDefMap } from './EffectDefMap';
import { EffectAdapter } from './EffectAdapter';

export class EffectMapAdapter {
  [name: string]: EffectAdapter;

  constructor(defs: EffectDefMap) {
    for (const [name, def] of Object.entries(defs)) {
      this[name] = new EffectAdapter(def);
    }
  }
}
