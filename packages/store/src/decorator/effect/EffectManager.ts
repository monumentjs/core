import 'reflect-metadata';
import { EffectDeclaration } from './EffectDeclaration';

export class EffectManager {
  static ofPrototype(prototype: object): EffectManager {
    let manager: EffectManager | undefined = Reflect.getMetadata(EffectManager, prototype);

    if (manager == null) {
      manager = new EffectManager(prototype);

      Reflect.defineMetadata(EffectManager, manager, prototype);
    }

    return manager;
  }

  static ofInstance(instance: object): EffectManager {
    return Reflect.getMetadata(EffectManager, Reflect.getPrototypeOf(instance));
  }

  private _declarations: EffectDeclaration[] = [];
  private _prototype: object;

  get declarations(): ReadonlyArray<EffectDeclaration> {
    return this._declarations;
  }

  constructor(prototype: object) {
    this._prototype = prototype;
  }

  add(property: PropertyKey, dispatch: boolean) {
    this._declarations.push(new EffectDeclaration(property, dispatch));
  }
}
