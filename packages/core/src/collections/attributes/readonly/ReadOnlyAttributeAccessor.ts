import { ReadOnlyMap } from '../../map/readonly/ReadOnlyMap';
import { Key } from '../Key';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface ReadOnlyAttributeAccessor {
    readonly attributes: ReadOnlyMap<Key<any>, any>;

    getAttribute<A>(token: Key<A>): A | undefined;

    hasAttribute<A>(token: Key<A>): boolean;
}
