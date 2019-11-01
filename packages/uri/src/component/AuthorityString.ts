import { TextPrinter } from '@monument/text';
import { UriFormatException } from '../exception/UriFormatException';
import { Authority } from './Authority';
import { AuthorityObject } from './AuthorityObject';
import { Password } from './Password';
import { PortObject } from './PortObject';
import { UserName } from './UserName';
import { HostString } from './HostString';
import { Host } from './Host';

const PATTERN = /^(([^:@]+)(:([^@]+))?@)?([^:]+)(:(\d+))?$/;

export class AuthorityString implements Authority {
  private readonly authority: Authority;

  get host(): Host {
    return this.authority.host;
  }

  get password(): Password {
    return this.authority.password;
  }

  get port(): PortObject {
    return this.authority.port;
  }

  get userName(): UserName {
    return this.authority.userName;
  }

  get present(): boolean {
    return this.authority.present;
  }

  constructor(
    readonly value: string | undefined
  ) {
    let host: string | undefined;
    let port: string | undefined;
    let userName: string | undefined;
    let password: string | undefined;

    if (value) {
      const parts: RegExpExecArray | null = PATTERN.exec(value);

      if (!parts) {
        throw new UriFormatException('Unable to parse authority string: invalid format');
      }

      userName = parts[2] || undefined;
      password = parts[4] || undefined;
      host = parts[5];
      port = parts[7] || undefined;
    }

    this.authority = new AuthorityObject(
      new HostString(host),
      PortObject.parse(port),
      UserName.decode(userName),
      Password.decode(password)
    );
  }

  equals(other: Authority): boolean {
    return this.authority.equals(other);
  }

  toString(): string {
    return this.authority.toString();
  }

  toJSON(): string {
    return this.authority.toJSON();
  }

  print(printer: TextPrinter): void {
    this.authority.print(printer);
  }
}
