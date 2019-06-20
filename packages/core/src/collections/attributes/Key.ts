import { ToString } from '../../base/ToString';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Key<T> implements ToString {
  readonly description: string;

  constructor(description: string) {
    this.description = description;
  }

  toString(): string {
    return this.description;
  }
}
