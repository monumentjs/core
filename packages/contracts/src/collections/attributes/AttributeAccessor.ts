import { Key } from '@monument/collections';
import { ReadOnlyAttributeAccessor } from './ReadOnlyAttributeAccessor';

/**
 * @todo need to change implementations to abstractions
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface AttributeAccessor extends ReadOnlyAttributeAccessor {
  removeAttribute<A>(token: Key<A>): A | undefined;

  setAttribute<A>(token: Key<A>, value: A): A | undefined;
}
