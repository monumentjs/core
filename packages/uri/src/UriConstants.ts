
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class UriConstants {
    public static readonly URI_PATTERN: RegExp =
        /^(([^:]+):\/\/)?(([^:@\/]+)(:([^@\/]+))?@)?([^.@:\/?#][^@:\/?#]*)?(:(\d+))?([.]{0,2}\/[^?#]*)?(\?([^#]*))?(#(.*))?$/;
    //    | schema      | username | password      | host                 | port   | path             | search    | fragment |
    public static readonly WINDOWS_ABSOLUTE_PATH_PATTERN: RegExp = /^\w*:[\\/]/i;
    public static readonly UNIX_ABSOLUTE_PATH_PATTERN: RegExp = /^\//i;
    public static readonly RELATIVE_PATH_PATTERN: RegExp = /^[.]{1,2}[\\/]/i;
    public static readonly QUERY_PARAMS_PAIR_DELIMITER: string = '&';
    public static readonly QUERY_PARAM_DELIMITER: string = '=';
    public static readonly CREDENTIALS_DELIMITER: string = ':';
    public static readonly PATH_FRAGMENT_DELIMITER: string = '/';
    public static readonly SCHEMA_SUFFIX: string = '://';
    public static readonly PORT_PREFIX: string = ':';
    public static readonly AUTHORITY_PREFIX: string = '@';
    public static readonly SEARCH_STRING_PREFIX: string = '?';
    public static readonly FRAGMENT_PREFIX: string = '#';
    public static readonly PORT_RADIX: number = 10;
}
