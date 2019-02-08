import { Equatable } from './Equatable';
import { EqualityComparator } from './EqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class EquatableComparator<T extends Equatable<any>> implements EqualityComparator<T> {
    public equals(x: T, y: T): boolean {
        return x.equals(y);
    }
}
