import {StringBuilder, ToString} from '@monument/core';
import {UriSchema} from './UriSchema';
import {UriComponents} from './UriComponents';
import {UriComponentsNormalizer} from './UriComponentsNormalizer';
import {UriConstants} from './UriConstants';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class UriSerializer {

    public serialize(components: UriComponents): string {
        const builder: StringBuilder = new StringBuilder();
        const normalizer: UriComponentsNormalizer = new UriComponentsNormalizer();
        const normalizedComponents: UriComponents = normalizer.normalize(components);

        this.writeSchema(builder, normalizedComponents);
        this.writeCredentials(builder, normalizedComponents);
        this.writeHost(builder, normalizedComponents);
        this.writePort(builder, normalizedComponents);
        this.writePath(builder, normalizedComponents);
        this.writeQueryParameters(builder, normalizedComponents);
        this.writeFragment(builder, normalizedComponents);

        return builder.toString();
    }

    private writeCredentials(builder: StringBuilder, components: UriComponents) {
        const {userName, password} = components;

        if (userName) {
            builder.append(userName);

            if (password) {
                builder.append(UriConstants.CREDENTIALS_DELIMITER);
                builder.append(password);
            }

            builder.append(UriConstants.AUTHORITY_PREFIX);
        }
    }

    private writeFragment(builder: StringBuilder, components: UriComponents) {
        const {fragment} = components;

        if (fragment) {
            builder.append(UriConstants.FRAGMENT_PREFIX);
            builder.append(fragment);
        }
    }

    private writeHost(builder: StringBuilder, components: UriComponents) {
        const {schema, host, port} = components;

        if (host) {
            if (UriSchema.FILE.equals(schema)) {
                if (!UriSchema.FILE.isDefaultHost(host) || port != null) {
                    builder.append(host);
                }
            } else {
                builder.append(host);
            }
        }
    }

    private writePath(builder: StringBuilder, components: UriComponents) {
        const {schema, host, path} = components;

        if (path) {
            const encodedPath: string = encodeURI(path);

            if (UriSchema.FILE.equals(schema)) {
                builder.append(encodedPath);
            } else {
                if (!(host && path === UriConstants.PATH_FRAGMENT_DELIMITER)) {
                    builder.append(encodedPath);
                }
            }
        }
    }

    private writePort(builder: StringBuilder, components: UriComponents) {
        const {host, port} = components;

        if (host && port) {
            builder.append(UriConstants.PORT_PREFIX);
            builder.append(port.toString(UriConstants.PORT_RADIX));
        }
    }

    private writeQueryParameter(builder: StringBuilder, key: string, value: ToString) {
        builder.append(encodeURIComponent(key));
        builder.append(UriConstants.QUERY_PARAM_DELIMITER);
        builder.append(encodeURIComponent(value.toString()));
    }

    private writeQueryParameters(builder: StringBuilder, components: UriComponents) {
        const {queryParameters} = components;

        if (queryParameters && !queryParameters.isEmpty) {
            let isFirst: boolean = true;

            builder.append(UriConstants.SEARCH_STRING_PREFIX);

            for (const {key, value} of queryParameters) {
                if (isFirst) {
                    isFirst = false;
                } else {
                    builder.append(UriConstants.QUERY_PARAMS_PAIR_DELIMITER);
                }

                this.writeQueryParameter(builder, key, value);
            }
        }
    }

    private writeSchema(builder: StringBuilder, components: UriComponents) {
        const {schema} = components;

        if (schema) {
            builder.append(schema);
            builder.append(UriConstants.SCHEMA_SUFFIX);
        }
    }
}
