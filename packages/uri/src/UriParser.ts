import { EMPTY_STRING, Parser } from '@monument/text';
import { UriComponents } from './UriComponents';
import { QueryParameters } from './QueryParameters';
import { UriFormatException } from '@monument/exceptions';
import { UriConstants } from './UriConstants';
import { UriComponentsNormalizer } from './UriComponentsNormalizer';
import { UriEncoder } from './UriEncoder';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class UriParser implements Parser<UriComponents> {
  private readonly _encoder: UriEncoder = new UriEncoder();

  canParse(source: string): boolean {
    return UriConstants.URI_PATTERN.test(source);
  }

  parse(source: string): UriComponents {
    const parts: RegExpExecArray | null = UriConstants.URI_PATTERN.exec(source);

    if (parts == null) {
      throw new UriFormatException(`URI has invalid format`);
    }

    const schema: string | undefined = parts[UriConstants.SCHEMA_COMPONENT_INDEX];
    const userName: string | undefined = parts[UriConstants.USER_NAME_COMPONENT_INDEX];
    const password: string | undefined = parts[UriConstants.PASSWORD_COMPONENT_INDEX];
    const host: string | undefined = parts[UriConstants.HOST_COMPONENT_INDEX];
    const port: string | undefined = parts[UriConstants.PORT_COMPONENT_INDEX];
    const path: string | undefined = parts[UriConstants.PATH_COMPONENT_INDEX];
    const search: string = parts[UriConstants.SEARCH_COMPONENT_INDEX] || EMPTY_STRING;
    const fragment: string | undefined = parts[UriConstants.FRAGMENT_COMPONENT_INDEX];

    return new UriComponentsNormalizer().normalize({
      schema: this._encoder.decodeComponent(schema),
      userName: this._encoder.decodeComponent(userName),
      password: this._encoder.decodeComponent(password),
      host: this._encoder.decodeComponent(host),
      port: port == null ? undefined : parseInt(port, 10),
      path: this._encoder.decodeUri(path || UriConstants.PATH_FRAGMENT_DELIMITER),
      queryParameters: new QueryParameters(search),
      fragment: this._encoder.decodeComponent(fragment)
    });
  }
}
