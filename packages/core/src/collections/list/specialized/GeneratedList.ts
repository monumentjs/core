import {LinkedList} from '../mutable/LinkedList';
import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {ReadOnlyListProxy} from '../readonly/proxy/ReadOnlyListProxy';
import {CollectionUtils} from '../../base/CollectionUtils';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class GeneratedList<T> extends ReadOnlyListProxy<T, LinkedList<T>> {
    public constructor(generator: (index: number) => T, count: number) {
        CollectionUtils.validateLength(count);

        const list: LinkedList<T> = new LinkedList();

        for (let index = 0; index < count; index++) {
            list.add(generator(index));
        }

        super(list);
    }

    public clone(): ReadOnlyList<T> {
        return this._items.clone();
    }
}
