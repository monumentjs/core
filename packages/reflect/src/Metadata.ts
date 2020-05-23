import { Key } from '@monument/collections';
import { Attributes } from './Attributes';
import { Decorators } from './Decorators';

export class Metadata {
  readonly attributes = new Attributes();
  readonly decorators = new Decorators();

  get decorated(): boolean {
    return this.decorators.count > 0;
  }

  decorate<T>(decorator: Function, key: Key<T>, value: T): void {
    this.decorators.attach(decorator);
    this.attributes.set(key, value);
  }
}
