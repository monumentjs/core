import {Parser, StringPool} from '@monument/core';
import {UriComponents} from './UriComponents';
import {QueryParameters} from './QueryParameters';
import {UriFormatException} from './UriFormatException';
import {UriConstants} from './UriConstants';
import {UriComponentsNormalizer} from './UriComponentsNormalizer';

const SCHEMA_COMPONENT_INDEX = 2;
const USER_NAME_COMPONENT_INDEX = 4;
const PASSWORD_COMPONENT_INDEX = 6;
const HOST_COMPONENT_INDEX = 7;
const PORT_COMPONENT_INDEX = 9;
const PATH_COMPONENT_INDEX = 10;
const SEARCH_COMPONENT_INDEX = 12;
const FRAGMENT_COMPONENT_INDEX = 14;

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class UriParser implements Parser<UriComponents> {
    public canParse(source: string): boolean {
        return UriConstants.URI_PATTERN.test(source);
    }

    public parse(source: string): UriComponents {
        const parts: RegExpExecArray | null = UriConstants.URI_PATTERN.exec(source);

        if (parts == null) {
            throw new UriFormatException(`URI has invalid format`);
        }

        const schema: string | undefined = parts[SCHEMA_COMPONENT_INDEX];
        const userName: string | undefined = parts[USER_NAME_COMPONENT_INDEX];
        const password: string | undefined = parts[PASSWORD_COMPONENT_INDEX];
        const host: string | undefined = parts[HOST_COMPONENT_INDEX];
        const port: string | undefined = parts[PORT_COMPONENT_INDEX];
        const path: string | undefined = parts[PATH_COMPONENT_INDEX];
        const search: string = parts[SEARCH_COMPONENT_INDEX] || StringPool.BLANK;
        const fragment: string | undefined = parts[FRAGMENT_COMPONENT_INDEX];

        return new UriComponentsNormalizer().normalize({
            schema,
            userName,
            password,
            host,
            port: port ? parseInt(port, 10) : undefined,
            path: path || UriConstants.PATH_FRAGMENT_DELIMITER,
            queryParameters: new QueryParameters(search),
            fragment
        });
    }
}
