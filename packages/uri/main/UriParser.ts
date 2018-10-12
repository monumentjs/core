import {StringPool} from '@monument/core/main/StringPool';
import {UriComponents} from './UriComponents';
import {UriBuilder} from './UriBuilder';
import {UriFormatException} from './UriFormatException';

/**
 * Default implementation of URI parser.
 *
 * @author Alex Chugaev
 * @final
 * @immutable
 * @singleton
 * @see {Uri}
 * @see {UriComponents}
 */
export class UriParser {
    private static readonly SCHEMA_COMPONENT_INDEX = 2;
    private static readonly USER_NAME_COMPONENT_INDEX = 4;
    private static readonly PASSWORD_COMPONENT_INDEX = 6;
    private static readonly HOST_COMPONENT_INDEX = 7;
    private static readonly PORT_COMPONENT_INDEX = 9;
    private static readonly PATH_COMPONENT_INDEX = 10;
    private static readonly SEARCH_COMPONENT_INDEX = 12;
    private static readonly FRAGMENT_COMPONENT_INDEX = 14;
    private static readonly QUERY_PARAMETER_NAME_COMPONENT_INDEX = 1;
    private static readonly QUERY_PARAMETER_VALUE_COMPONENT_INDEX = 2;
    public static readonly URI_PATTERN: RegExp = /^(([^:]+):\/\/)?(([^:@\/]+)(:([^@\/]+))?@)?([^@:\/?#]+)?(:(\d+))?(\/[^?#]*)?(\?([^#]*))?(#(.*))?$/;
    public static readonly QUERY_PARAMETER_PATTERN: RegExp = /([^&=]+)=([^&]*)/g;

    /**
     * @throws {UriFormatException}
     */
    public static parse(source: string): UriComponents {
        const urlMatch: RegExpExecArray | null = UriParser.URI_PATTERN.exec(source);

        if (urlMatch == null) {
            throw new UriFormatException(`URI has invalid format`);
        }

        const builder: UriBuilder = new UriBuilder();
        const schema: string | undefined = urlMatch[UriParser.SCHEMA_COMPONENT_INDEX];
        const userName: string | undefined = urlMatch[UriParser.USER_NAME_COMPONENT_INDEX];
        const password: string | undefined = urlMatch[UriParser.PASSWORD_COMPONENT_INDEX];
        const host: string | undefined = urlMatch[UriParser.HOST_COMPONENT_INDEX];
        const port: string | undefined = urlMatch[UriParser.PORT_COMPONENT_INDEX];
        const path: string | undefined = urlMatch[UriParser.PATH_COMPONENT_INDEX];
        const search: string = urlMatch[UriParser.SEARCH_COMPONENT_INDEX] || StringPool.BLANK;
        const fragment: string | undefined = urlMatch[UriParser.FRAGMENT_COMPONENT_INDEX];

        builder.schema = schema;
        builder.userName = userName;
        builder.password = password;
        builder.host = host;
        builder.port = port ? parseInt(port, 10) : undefined;
        builder.path = path;
        builder.fragment = fragment;

        let match: RegExpMatchArray | null = search.match(UriParser.QUERY_PARAMETER_PATTERN);

        while (match != null) {
            const name: string = match[UriParser.QUERY_PARAMETER_NAME_COMPONENT_INDEX];
            const value: string = match[UriParser.QUERY_PARAMETER_VALUE_COMPONENT_INDEX];

            builder.setParameter(name, value);

            match = search.match(UriParser.QUERY_PARAMETER_PATTERN);
        }

        return builder;
    }

    private constructor() {
    }
}
