import 'reflect-metadata';
import { ReactionDeclaration } from './ReactionDeclaration';

export class ReactionManager {
  static ofPrototype(prototype: object): ReactionManager {
    let manager: ReactionManager | undefined = Reflect.getMetadata(ReactionManager, prototype);

    if (manager == null) {
      manager = new ReactionManager(prototype);

      Reflect.defineMetadata(ReactionManager, manager, prototype);
    }

    return manager;
  }

  static ofInstance(instance: object): ReactionManager {
    return Reflect.getMetadata(ReactionManager, Reflect.getPrototypeOf(instance));
  }

  private readonly _declarations: ReactionDeclaration[] = [];
  private _prototype: object;

  get declarations(): ReadonlyArray<ReactionDeclaration> {
    return this._declarations;
  }

  constructor(prototype: object) {
    this._prototype = prototype;
  }

  add(methodName: PropertyKey, actionType: string) {
    this._declarations.push(new ReactionDeclaration(methodName, actionType));
  }
}
