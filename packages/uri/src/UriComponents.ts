import {ReadOnlyQueryParameters} from './ReadOnlyQueryParameters';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export interface UriComponents {
    readonly schema?: string;
    readonly userName?: string;
    readonly password?: string;
    readonly host?: string;
    readonly port?: number;
    readonly path?: string;
    readonly fragment?: string;
    readonly queryParameters?: ReadOnlyQueryParameters;
}
