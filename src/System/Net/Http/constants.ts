import Collection from '../../../Core/Collections/Collection';


export const STANDALONE_HTTP_HEADERS: Collection<string> = new Collection([
    'age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host',
    'if-modified-since', 'if-unmodified-since', 'last-modified',
    'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'
]);

