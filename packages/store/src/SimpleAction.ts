import { Action } from './Action';

export class SimpleAction<T extends string> implements Action {
  readonly type: T;

  constructor(type: T) {
    this.type = type;
  }
}
