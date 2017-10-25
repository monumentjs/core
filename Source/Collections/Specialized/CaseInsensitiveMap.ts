import {IEnumerable} from '../Abstraction/IEnumerable';
import {IKeyValuePair} from '../Abstraction/IKeyValuePair';
import {Map} from '../Map';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';
import {EqualityComparator} from '../../Core/EqualityComparator';
import {IgnoreCaseComparator} from '../../Text/IgnoreCaseComparator';


export class CaseInsensitiveMap<V> extends Map<string, V> {
    public constructor(
        values: IEnumerable<IKeyValuePair<string, V>> = [],
        valueComparator: IEqualityComparator<V> = EqualityComparator.instance
    ) {
        super(values, IgnoreCaseComparator.instance, valueComparator);
    }


    public clone(): CaseInsensitiveMap<V> {
        return new CaseInsensitiveMap(this, this.valueComparator);
    }
}
