import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {Map} from '../../main/Map';
import {ListMap} from '../../main/ListMap';
import {KeyValuePair} from '../../main/KeyValuePair';
import {MapSpec} from './MapSpec';


export class ListMapTest extends MapSpec {

    public create(
        items: Iterable<KeyValuePair<string, string>>,
        keyComparator?: EqualityComparator<string>,
        valueComparator?: EqualityComparator<string>
    ): Map<string, string> {
        return new ListMap(items, keyComparator, valueComparator);
    }
}
