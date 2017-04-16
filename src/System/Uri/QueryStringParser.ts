import {ICustomParser} from '../../Core/types';
import QueryParamsCollection from './QueryParamsCollection';
import Uri from './Uri';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


const KEY_VALUE_PAIRS_DELIMITER: string = '&';
const KEY_VALUE_DELIMITER: string = '=';


export default class QueryStringParser implements ICustomParser<QueryParamsCollection> {
    public static parse(queryString: string): QueryParamsCollection {
        let parser: QueryStringParser = new QueryStringParser();

        return parser.parse(queryString);
    }


    public parse(queryString: string): QueryParamsCollection {
        assertArgumentNotNull('queryString', queryString);

        let pairs: string[] = queryString.split(KEY_VALUE_PAIRS_DELIMITER);
        let queryParams: QueryParamsCollection = new QueryParamsCollection();

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
