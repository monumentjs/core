import {CollectionUtils} from '../base/CollectionUtils';
import {InvalidArgumentException} from '../../exceptions/InvalidArgumentException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class RangeIterator implements Iterable<number> {
    private readonly _from: number;
    private readonly _to: number;
    private readonly _step: number;

    public constructor(from: number, to: number, step: number = 1) {
        CollectionUtils.validateBounds(from, to);

        if (step <= 0) {
            throw new InvalidArgumentException('Step cannot be negative or zero');
        }

        this._from = from;
        this._to = to;
        this._step = step;
    }

    public* [Symbol.iterator](): Iterator<number> {
        for (let value = this._from; value < this._to; value += this._step) {
            yield value;
        }
    }
}
