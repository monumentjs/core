import { Key } from '@monument/collections';

export class Attributes {
  private readonly attributes = new Map<Key, any>();

  get<T>(key: Key<T>): T | undefined {
    return this.attributes.get(key);
  }

  set<T>(key: Key<T>, value: T): this {
    this.attributes.set(key, value);

    return this;
  }

  delete<T>(key: Key<T>): boolean {
    return this.attributes.delete(key);
  }

  has<T>(key: Key<T>): boolean {
    return this.attributes.has(key);
  }
}
