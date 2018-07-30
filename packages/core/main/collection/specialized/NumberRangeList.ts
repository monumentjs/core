import {ReadOnlyListProxy} from '../readonly/proxy/ReadOnlyListProxy';
import {LinkedList} from '../mutable/LinkedList';
import {POSITIVE_ONE, ZERO} from '../../Constants';
import {Assert} from '../../assert/Assert';
import {InvalidArgumentException} from '../../exceptions/InvalidArgumentException';


export class NumberRangeList extends ReadOnlyListProxy<number, LinkedList<number>> {
    public constructor(from: number, to: number, step: number = POSITIVE_ONE) {
        Assert.range(from, to).bounds();

        if (step === ZERO) {
            throw new InvalidArgumentException('step', `Step cannot be equal to zero.`);
        }

        const list: LinkedList<number> = new LinkedList<number>();

        for (let num = from; num < to; num += step) {
            list.add(num);
        }

        super(list);
    }
}
