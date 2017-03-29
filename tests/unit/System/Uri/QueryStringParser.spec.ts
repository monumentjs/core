import QueryStringParser from '../../../../lib/System/Uri/QueryStringParser';
import KeyValueCollection from '../../../../lib/Core/Collections/KeyValueCollection';
import {QUERY_STRING_EXAMPLES, QUERY_STRING_OBJECTS} from './fixtures/QueryParamsFixtutes';


describe('QueryStringParser', () => {
    describe('#constructor()', () => {
        it('create new instance of QueryStringParser class', () => {
            let parser: QueryStringParser = null;

            expect(function () {
                parser = new QueryStringParser();
            }).not.toThrow();

            expect(parser).toBeInstanceOf(QueryStringParser);
        });
    });


    describe('#parse()', () => {
        it('parse query string and return object in proper format', () => {
            let parser: QueryStringParser = new QueryStringParser();

            QUERY_STRING_EXAMPLES.forEach((queryString: string) => {
                let obj = QUERY_STRING_OBJECTS[queryString];
                let query: KeyValueCollection<string, string> = parser.parse(queryString);

                Object.keys(obj).forEach((key: string): void => {
                    expect(query.findByKey(key)).toEqual(obj[key]);
                });
            });
        });
    });
});