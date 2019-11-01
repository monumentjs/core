import { ToString } from '@monument/core';
import { EquatableEquals, MultiValueEquals } from '@monument/comparison';
import { UriFormatException } from '../../exception/UriFormatException';
import { EncodedPath } from '../../component/path/EncodedPath';
import { EncodedQuery } from '../../component/query/EncodedQuery';
import { EncodedFragment } from '../../component/fragment/EncodedFragment';
import { Uri } from '../../base/Uri';
import { UriString } from '../../parsing/uri/UriString';
import { HttpScheme } from './HttpScheme';
import { HttpAuthority } from './HttpAuthority';
import { FragmentComponent } from '../../base/component/fragment/FragmentComponent';
import { QueryComponent } from '../../base/component/query/QueryComponent';
import { PathComponent } from '../../base/component/path/PathComponent';
import { UserNameComponent } from '../../component/user-name/UserNameComponent';
import { PasswordComponent } from '../../base/component/password/PasswordComponent';
import { HostObject } from '../../component/HostObject';
import { PortComponent } from '../../base/component/port/PortComponent';
import { HttpPath } from './HttpPath';
import { HttpQuery } from './HttpQuery';
import { HttpFragment } from './HttpFragment';

/**
 * Represents HTTP(S) URI.
 * @since 0.16.0
 * @author Alex Chugaev
 */
export class HttpUri implements Uri {
  private readonly original: string;

  readonly scheme: HttpScheme;
  readonly authority: HttpAuthority;
  readonly path: HttpPath;
  readonly query: HttpQuery;
  readonly fragment: HttpFragment;
  readonly userName: UserNameComponent;
  readonly password: PasswordComponent;
  readonly host: HostObject;
  readonly port: PortComponent;

  /**
   * Creates URI by parsing source string.
   * @throws {UriFormatException} if URI represented by source string is has wrong format
   * @throws {UriIntegrityException} if URI integrity is broken
   */
  constructor(original: string);

  constructor(original: string) {
    const uri = new UriString(original);

    this.scheme = new HttpScheme(uri.scheme);
    this.authority = new HttpAuthority(uri.authority);
    this.path = new HttpPath(uri.path);
    this.query = new HttpQuery(uri.query);
    this.fragment = new HttpFragment(uri.fragment);
    this.userName = this.authority.userName;
    this.password = this.authority.password;
    this.host = this.authority.host;
    this.port = this.authority.port;
    this.original = original;

    this.scheme.rules.integrity(this);
  }

  toString(): string {
    return this.original;
  }

  toJSON(): string {
    return this.toString();
  }

  equals(other: Uri): boolean {
    if (this === other) {
      return true;
    }

    if (other instanceof HttpUri) {
      return MultiValueEquals([
        [this.scheme, other.scheme, EquatableEquals],
        [this.authority, other.authority, EquatableEquals],
        [this.path, other.path, EquatableEquals],
        [this.query, other.query, EquatableEquals],
        [this.fragment, other.fragment, EquatableEquals]
      ]);
    }

    return false;
  }

  withUserName(userName: UserNameComponent): Uri {
    throw new Error('Method not implemented.');
  }

  withPassword(password: PasswordComponent): Uri {
    throw new Error('Method not implemented.');
  }

  withUserInfo(userName: UserNameComponent, password?: PasswordComponent | undefined): Uri {
    throw new Error('Method not implemented.');
  }

  withHost(host: HostObject): Uri {
    throw new Error('Method not implemented.');
  }

  withPort(port: PortComponent): Uri {
    throw new Error('Method not implemented.');
  }

  withAuthority(authority: import('../../component/AuthorityObject').AuthorityObject): Uri {
    throw new Error('Method not implemented.');
  }

  withPath(path: PathComponent): Uri {
    throw new Error('Method not implemented.');
  }

  withQuery(query: QueryComponent): Uri {
    throw new Error('Method not implemented.');
  }

  withFragment(fragment: FragmentComponent): Uri {
    throw new Error('Method not implemented.');
  }

  withParameter(name: string, value: import('@monument/core').ToString): Uri {
    throw new Error('Method not implemented.');
  }

  withoutUserName(): Uri {
    throw new Error('Method not implemented.');
  }

  withoutPassword(): Uri {
    throw new Error('Method not implemented.');
  }

  withoutUserInfo(): Uri {
    throw new Error('Method not implemented.');
  }

  withoutHost(): Uri {
    throw new Error('Method not implemented.');
  }

  withoutPort(): Uri {
    throw new Error('Method not implemented.');
  }

  withoutPath(): Uri {
    throw new Error('Method not implemented.');
  }

  withoutParameter(name: string): Uri;
  withoutParameter(name: string, value: ToString): Uri;
  withoutParameter(name: string, value?: ToString): Uri {
    throw new Error('Method not implemented.');
  }

  withoutQuery(): Uri {
    throw new Error('Method not implemented.');
  }

  withoutFragment(): Uri {
    throw new Error('Method not implemented.');
  }

}
