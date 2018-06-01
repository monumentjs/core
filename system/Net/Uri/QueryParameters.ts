import {StringBuilder} from '../../../text/main/StringBuilder';
import {Equatable} from '../../../core/main/Equatable';
import {ListMap} from '../../../collections/main/ListMap';
import {Uri} from './Uri';


export class QueryParameters extends ListMap<string, string> implements Equatable<QueryParameters> {

    public equals(other: QueryParameters): boolean {
        for (const currentItem of this) {
            if (!other.containsEntry(currentItem.key, currentItem.value)) {
                return false;
            }
        }

        for (const otherItem of other) {
            if (!this.containsEntry(otherItem.key, otherItem.value)) {
                return false;
            }
        }

        return true;
    }


    public toString(): string {
        const builder: StringBuilder = new StringBuilder();
        let index: number = 0;

        for (const {key, value} of this) {
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
