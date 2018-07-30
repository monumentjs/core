import {EqualityComparator} from '@monument/core/main/utils/comparison/EqualityComparator';
import {Sequence} from '@monument/core/main/collection/readonly/Sequence';
import {PropertyValidationRule} from '../validation/PropertyValidationRule';
import {StrictEqualityComparator} from '@monument/core/main/utils/comparison/StrictEqualityComparator';


export class PropertyConfiguration<T> {
    public static readonly DEFAULT: PropertyConfiguration<any> = new PropertyConfiguration();

    public constructor(
        public readonly comparator: EqualityComparator<T> = StrictEqualityComparator.get(),
        public readonly validationRules: Sequence<PropertyValidationRule<T>> = []
    ) {}
}
