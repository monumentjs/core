import {QueryableProxy} from './proxy/QueryableProxy';
import {Queryable} from './Queryable';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Grouping<K, V> extends QueryableProxy<V, Queryable<V>> {
    public readonly key: K;

    public constructor(key: K, items: Queryable<V>) {
        super(items);
        this.key = key;
    }
}
