import {StringBuilder} from '@monument/core/main/text/StringBuilder';
import {UriComponents} from './UriComponents';
import {UriUtils} from './UriUtils';

/**
 * @final
 * @static
 * @author Alex Chugaev
 */
export class UriSerializer {
    public static readonly QUERY_PARAMS_PAIR_DELIMITER: string = '&';
    public static readonly QUERY_PARAM_DELIMITER: string = '=';
    public static readonly CREDENTIALS_DELIMITER: string = ':';
    public static readonly SCHEMA_SUFFIX: string = '://';
    public static readonly PORT_PREFIX: string = ':';
    public static readonly AUTHORITY_PREFIX: string = '@';
    public static readonly SEARCH_STRING_PREFIX: string = '?';
    public static readonly FRAGMENT_PREFIX: string = '#';

    public static serialize(components: UriComponents): string {
        UriUtils.validateIntegrity(components);

        const b: StringBuilder = new StringBuilder();

        this.writeSchema(components, b);
        this.writeCredentials(components, b);
        this.writeAuthority(components, b);
        this.writePath(components, b);
        this.writeQueryParameters(components, b);
        this.writeFragment(components, b);

        return b.toString();
    }

    private static writeFragment(components: UriComponents, b: StringBuilder) {
        if (components.fragment) {
            b.append(UriSerializer.FRAGMENT_PREFIX);
            b.append(components.fragment);
        }
    }

    private static writeQueryParameters(components: UriComponents, b: StringBuilder) {
        if (!components.queryParameters.isEmpty) {
            let isFirst: boolean = true;

            b.append(UriSerializer.SEARCH_STRING_PREFIX);

            for (const {key, value} of components.queryParameters) {
                if (isFirst) {
                    isFirst = false;
                } else {
                    b.append(UriSerializer.QUERY_PARAMS_PAIR_DELIMITER);
                }

                b.append(encodeURIComponent(key));
                b.append(UriSerializer.QUERY_PARAM_DELIMITER);
                b.append(encodeURIComponent(value));
            }
        }
    }

    private static writePath(components: UriComponents, b: StringBuilder) {
        if (components.path) {
            b.append(components.path);
        }
    }

    private static writeAuthority(components: UriComponents, b: StringBuilder) {
        if (components.host) {
            b.append(components.host);

            if (components.port) {
                b.append(UriSerializer.PORT_PREFIX);
                b.append(components.port.toString(10));
            }
        }
    }

    private static writeCredentials(components: UriComponents, b: StringBuilder) {
        if (components.userName) {
            b.append(components.userName);

            if (components.password) {
                b.append(UriSerializer.CREDENTIALS_DELIMITER);
                b.append(components.password);
            }

            b.append(UriSerializer.AUTHORITY_PREFIX);
        }
    }

    private static writeSchema(components: UriComponents, b: StringBuilder) {
        if (components.schema) {
            b.append(components.schema);
            b.append(UriSerializer.SCHEMA_SUFFIX);
        }
    }

    private constructor() {
    }
}
