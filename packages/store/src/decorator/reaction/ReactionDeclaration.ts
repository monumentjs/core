export class ReactionDeclaration {
  readonly methodName: PropertyKey;

  readonly actionType: string;

  constructor(methodName: PropertyKey, actionType: string) {
    this.methodName = methodName;
    this.actionType = actionType;
  }
}
