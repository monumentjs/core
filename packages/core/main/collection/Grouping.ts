import {ReadOnlyList} from './ReadOnlyList';
import {ArrayList} from './ArrayList';
import {Sequence} from './Sequence';


export class Grouping<K, V> {
    public readonly key: K;
    public readonly items: ReadOnlyList<V>;

    public constructor(key: K, values: Sequence<V>) {
        this.key = key;
        this.items = new ArrayList(values);
    }
}
