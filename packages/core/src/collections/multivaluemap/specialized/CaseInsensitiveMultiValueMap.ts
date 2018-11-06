import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {IgnoreCaseEqualityComparator} from '../../../comparison/equality/IgnoreCaseEqualityComparator';
import {LinkedMultiValueMap} from '../mutable/LinkedMultiValueMap';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class CaseInsensitiveMultiValueMap<V> extends LinkedMultiValueMap<string, V> {

    public constructor(valueComparator: EqualityComparator<V> = StrictEqualityComparator.get()) {
        super(IgnoreCaseEqualityComparator.get(), valueComparator);
    }
}
