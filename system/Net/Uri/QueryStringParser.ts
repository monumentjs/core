import {QueryParameters} from './QueryParameters';
import {Uri} from './Uri';


const KEY_VALUE_PAIRS_DELIMITER: string = '&';
const KEY_VALUE_DELIMITER: string = '=';


export class QueryStringParser {

    public static parse(queryString: string): QueryParameters {
        let pairs: string[] = queryString.split(KEY_VALUE_PAIRS_DELIMITER);
        let queryParams: QueryParameters = new QueryParameters();

        pairs.forEach((pair: string): void => {
            if (pair) {
                let [key, value] = pair.split(KEY_VALUE_DELIMITER);

                queryParams.put(
                    Uri.decodeComponent(key),
                    Uri.decodeComponent(value)
                );
            }
        });

        return queryParams;
    }
}
