import {ReadOnlyListProxy} from '../readonly/proxy/ReadOnlyListProxy';
import {LinkedList} from '../mutable/LinkedList';
import {Assert} from '../../assert/Assert';
import {ZERO} from '../../Constants';


export class GeneratedList<T> extends ReadOnlyListProxy<T, LinkedList<T>> {
    public constructor(generator: (index: number) => T, count: number) {
        Assert.argument('count', count).isLength();

        const list: LinkedList<T> = new LinkedList();

        for (let index = ZERO; index < count; index++) {
            list.add(generator(index));
        }

        super(list);
    }
}
