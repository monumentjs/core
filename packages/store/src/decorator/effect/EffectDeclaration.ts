
export class EffectDeclaration {
  readonly property: PropertyKey;

  readonly dispatch: boolean;

  constructor(property: PropertyKey, dispatch: boolean) {
    this.dispatch = dispatch;
    this.property = property;
  }
}
