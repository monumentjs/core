import {KeyValueCollection} from '@monument/core/Source/Collections/KeyValueCollection';
import {QueryStringParser} from '../../..//Net/Uri/QueryStringParser';
import {QUERY_STRING_EXAMPLES, QUERY_STRING_OBJECTS} from './fixtures/QueryParamsFixtutes';


describe('QueryStringParser', () => {
    describe('#push()', () => {
        it('push query string and return reflection in proper format', () => {
            QUERY_STRING_EXAMPLES.forEach((queryString: string) => {
                let obj = QUERY_STRING_OBJECTS[queryString];
                let query: KeyValueCollection<string, string> = QueryStringParser.instance.parse(queryString);

                Object.keys(obj).forEach((key: string): void => {
                    assert.equals(query.findByKey(key), (obj as any)[key]);
                });
            });
        });
    });
});
