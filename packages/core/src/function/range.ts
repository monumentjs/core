import {CollectionUtils} from '../collections/base/CollectionUtils';
import {InvalidArgumentException} from '../exceptions/InvalidArgumentException';

export function range(from: number, to: number, step: number = 1): Iterable<number> {
    CollectionUtils.validateBounds(from, to);

    if (step <= 0) {
        throw new InvalidArgumentException('Step cannot be negative or zero');
    }

    return (
        function* () {
            for (let value = from; value < to; value += step) {
                yield value;
            }
        }
    )();
}
