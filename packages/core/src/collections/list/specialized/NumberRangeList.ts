import {ReadOnlyListProxy} from '../readonly/proxy/ReadOnlyListProxy';
import {LinkedList} from '../mutable/LinkedList';
import {InvalidArgumentException} from '../../../exceptions/InvalidArgumentException';
import {CollectionUtils} from '../../base/CollectionUtils';
import {ReadOnlyList} from '../readonly/ReadOnlyList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class NumberRangeList extends ReadOnlyListProxy<number, LinkedList<number>> {
    public constructor(from: number, to: number, step: number = 1) {
        CollectionUtils.validateBounds(from, to);

        if (step === 0) {
            throw new InvalidArgumentException(`Step cannot be equal to zero.`);
        }

        const list: LinkedList<number> = new LinkedList<number>();

        for (let num = from; num < to; num += step) {
            list.add(num);
        }

        super(list);
    }

    public clone(): ReadOnlyList<number> {
        return this._items.clone();
    }
}
