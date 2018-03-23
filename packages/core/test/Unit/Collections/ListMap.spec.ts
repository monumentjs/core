import {Test} from '../../../../test-drive/Decorators/TestConfiguration';
import {Map} from '../../../../collections-core/main/Map';
import {ListMap} from '../../../../collections/main/ListMap';
import {KeyValuePair} from '../../../../collections-core/main/KeyValuePair';
import {EqualityComparator} from '../../../main/EqualityComparator';
import {MapSpec} from './Abstract/MapSpec';


@Test()
export class ListMapSpec extends MapSpec {

    public create(
        items: Iterable<KeyValuePair<string, string>>,
        keyComparator?: EqualityComparator<string>,
        valueComparator?: EqualityComparator<string>
    ): Map<string, string> {
        return new ListMap(items, keyComparator, valueComparator);
    }
}
