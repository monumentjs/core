import {ReadOnlyCollectionProxy} from '../collection/readonly/proxy/ReadOnlyCollectionProxy';
import {ReadOnlyCollection} from '../collection/readonly/ReadOnlyCollection';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Grouping<K, V> extends ReadOnlyCollectionProxy<V, ReadOnlyCollection<V>> {
    public readonly key: K;

    public constructor(key: K, items: ReadOnlyCollection<V>) {
        super(items);
        this.key = key;
    }
}
