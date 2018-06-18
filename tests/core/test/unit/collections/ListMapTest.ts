import {TestConfiguration} from '@monument/test-drive/main/decorators/TestConfiguration';
import {Map} from '@monument/core/main/collections/Map';
import {ListMap} from '@monument/core/main/collections/ListMap';
import {KeyValuePair} from '@monument/core/main/collections/KeyValuePair';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {IgnoreCaseComparator} from '@monument/core/main/text/IgnoreCaseComparator';
import {MapSpec} from './MapSpec';

@TestConfiguration({
    components: [
        IgnoreCaseComparator
    ]
})
export class ListMapTest extends MapSpec {

    public create(
        items: Iterable<KeyValuePair<string, string>>,
        keyComparator?: EqualityComparator<string>,
        valueComparator?: EqualityComparator<string>
    ): Map<string, string> {
        return new ListMap(items, keyComparator, valueComparator);
    }
}
