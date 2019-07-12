import 'reflect-metadata';
import { EffectDeclarations } from './EffectDeclarations';
import { EffectDeclaration } from './EffectDeclaration';

export class EffectsSource {
  readonly declarations: EffectDeclaration[] = [];

  constructor(readonly instance: object) {
    const declarations: EffectDeclarations | undefined = Reflect.getMetadata(EffectDeclarations, Reflect.getPrototypeOf(instance));

    if (declarations != null) {
      this.declarations = declarations.declarations;
    }
  }
}
