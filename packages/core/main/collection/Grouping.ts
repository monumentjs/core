import {Sequence} from './readonly/Sequence';


export class Grouping<K, V> {
    public readonly key: K;
    public readonly items: Sequence<V>;

    public constructor(key: K, items: Sequence<V>) {
        this.key = key;
        this.items = items;
    }
}
