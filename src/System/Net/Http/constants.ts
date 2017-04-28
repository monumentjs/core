import {ReadOnlyCollection} from '../../../Core/Collections/ReadOnlyCollection';


export const STANDALONE_HTTP_HEADERS: ReadOnlyCollection<string> = new ReadOnlyCollection([
    'age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host',
    'if-modified-since', 'if-unmodified-since', 'last-modified',
    'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'
]);

