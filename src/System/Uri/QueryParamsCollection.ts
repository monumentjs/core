import {KeyValueCollection} from '../../Core/Collections/KeyValueCollection';
import {StringBuilder} from '../../Core/Text/StringBuilder';
import {Uri} from './Uri';
import {IEquatable} from '../../Core/types';
import {KeyValueEqualityComparator} from '../../Core/Collections/KeyValueEqualityComparator';
import {Assert} from '../../Core/Assertion/Assert';


export class QueryParamsCollection
    extends KeyValueCollection<string, string>
    implements IEquatable<QueryParamsCollection> {

    public equals(other: QueryParamsCollection): boolean {
        Assert.argument('other', other).notNull();

        for (let currentItem of this) {
            if (!other.contains(currentItem, KeyValueEqualityComparator.instance)) {
                return false;
            }
        }

        for (let otherItem of other) {
            if (!this.contains(otherItem, KeyValueEqualityComparator.instance)) {
                return false;
            }
        }

        return true;
    }


    public toString(): string {
        let builder: StringBuilder = new StringBuilder();
        let index: number = 0;

        for (let {key, value} of this) {
            if (index > 0) {
                builder.append('&');
            }

            builder.append(
                Uri.encodeComponent(key) +
                '=' +
                Uri.encodeComponent(value)
            );

            index += 1;
        }

        return builder.toString();
    }
}
