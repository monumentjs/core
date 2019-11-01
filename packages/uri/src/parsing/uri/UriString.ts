import { UriFormatException } from '../../exception/UriFormatException';

const PATTERN: RegExp = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i;

export class UriString {
  readonly scheme?: string;
  readonly authority?: string;
  readonly path?: string;
  readonly query?: string;
  readonly fragment?: string;

  constructor(source: string) {
    const parts: RegExpExecArray | null = PATTERN.exec(source);

    if (parts == null) {
      throw new UriFormatException('Unable to parse URI: invalid format');
    }

    this.scheme = parts[2] || undefined;
    this.authority = parts[4] || undefined;
    this.path = parts[5] || undefined;
    this.query = parts[7] || undefined;
    this.fragment = parts[9] || undefined;
  }
}
