import 'reflect-metadata';
import { EffectDeclarations } from '../EffectDeclarations';
import { EffectDeclaration } from '../EffectDeclaration';

export type EffectConfiguration = {
  dispatch: boolean;
};

export function Effect(configuration: EffectConfiguration = {
  dispatch: true
}): PropertyDecorator {
  return (target, propertyKey) => {
    let declarations: EffectDeclarations | undefined = Reflect.getMetadata(EffectDeclarations, target);

    if (declarations == null) {
      declarations = new EffectDeclarations();

      Reflect.defineMetadata(EffectDeclarations, declarations, target);
    }

    declarations.declarations.push(new EffectDeclaration(propertyKey, configuration.dispatch));
  };
}
