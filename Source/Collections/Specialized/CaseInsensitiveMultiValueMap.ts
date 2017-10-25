import {MultiValueMap} from './MultiValueMap';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {IKeyValuePair} from '../Abstraction/IKeyValuePair';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';
import {EqualityComparator} from '../../Core/EqualityComparator';
import {IgnoreCaseComparator} from '../../Text/IgnoreCaseComparator';
import {List} from '../List';


export class CaseInsensitiveMultiValueMap<V> extends MultiValueMap<string, V> {
    public constructor(
        values: IEnumerable<IKeyValuePair<string, List<V>>>,
        valueComparator: IEqualityComparator<List<V>> = EqualityComparator.instance
    ) {
        super(values, IgnoreCaseComparator.instance, valueComparator);
    }


    public clone(): CaseInsensitiveMultiValueMap<V> {
        return new CaseInsensitiveMultiValueMap(this);
    }
}
