import { ToString } from '@monument/core';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Key<T = any> implements ToString {
  constructor(readonly description = '') {
    this.description = description;
  }

  toString(): string {
    return this.description;
  }
}
