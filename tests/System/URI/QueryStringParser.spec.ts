import QueryStringParser from '../../../lib/System/URI/QueryStringParser';
import {SearchQuery} from './helpers/types';
import SearchQueryMapper from './helpers/SearchQueryMapper';


const QUERY_STRING_EXAMPLES = [
    'q=books'
];


const QUERY_STRING_OBJECTS = {
    [QUERY_STRING_EXAMPLES[0]]: {
        q: 'books',
        page: 1,
        limit: 10
    }
};


describe('QueryStringParser', () => {
    describe('#constructor()', () => {
        it('should create new instance of QueryStringParser class', () => {
            let parser: QueryStringParser<SearchQuery> = null;

            expect(function () {
                parser = new QueryStringParser<SearchQuery>(new SearchQueryMapper());
            }).not.toThrow();

            expect(parser).toBeInstanceOf(QueryStringParser);
        });
    });


    describe('#parse()', () => {
        it('should parse query string and return object in proper format', () => {
            let parser: QueryStringParser<SearchQuery> = new QueryStringParser<SearchQuery>(new SearchQueryMapper());

            QUERY_STRING_EXAMPLES.forEach((queryString: string) => {
                let obj = QUERY_STRING_OBJECTS[queryString];
                let query: SearchQuery = parser.parse(queryString);

                expect(query).toEqual(obj);
            });
        });
    });
});