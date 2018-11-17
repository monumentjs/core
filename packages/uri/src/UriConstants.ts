
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export namespace UriConstants {
    export const URI_PATTERN: RegExp =
        /^((([^:]+):)?\/\/)?(([^:@\/]+)(:([^@\/]+))?@)?([^.@:\/?#][^@:\/?#]*)?(:(\d+))?([.]{0,2}\/[^?#]*)?(\?([^#]*))?(#(.*))?$/;
    //    | schema         | username | password      | host                 | port   | path             | search    | fragment |

    export const SCHEMA_COMPONENT_INDEX = 3;
    export const USER_NAME_COMPONENT_INDEX = 5;
    export const PASSWORD_COMPONENT_INDEX = 7;
    export const HOST_COMPONENT_INDEX = 8;
    export const PORT_COMPONENT_INDEX = 10;
    export const PATH_COMPONENT_INDEX = 11;
    export const SEARCH_COMPONENT_INDEX = 13;
    export const FRAGMENT_COMPONENT_INDEX = 15;

    export const WINDOWS_ABSOLUTE_PATH_PATTERN: RegExp = /^\w*:[\\/]/i;
    export const UNIX_ABSOLUTE_PATH_PATTERN: RegExp = /^\//i;
    export const RELATIVE_PATH_PATTERN: RegExp = /^[.]{1,2}[\\/]/i;
    export const QUERY_PARAMS_PAIR_DELIMITER: string = '&';
    export const QUERY_PARAM_DELIMITER: string = '=';
    export const CREDENTIALS_DELIMITER: string = ':';
    export const PATH_FRAGMENT_DELIMITER: string = '/';
    export const SCHEMA_SUFFIX: string = '://';
    export const PORT_PREFIX: string = ':';
    export const AUTHORITY_PREFIX: string = '@';
    export const SEARCH_STRING_PREFIX: string = '?';
    export const FRAGMENT_PREFIX: string = '#';
    export const PORT_RADIX: number = 10;
}
