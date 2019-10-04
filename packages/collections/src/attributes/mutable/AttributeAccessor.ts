import { Key } from '../Key';
import { ReadOnlyAttributeAccessor } from '../readonly/ReadOnlyAttributeAccessor';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface AttributeAccessor extends ReadOnlyAttributeAccessor {
  removeAttribute<A>(token: Key<A>): A | undefined;

  setAttribute<A>(token: Key<A>, value: A): A | undefined;
}
