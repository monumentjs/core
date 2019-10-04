import { Scheme } from './Scheme';
import { Password } from './Password';
import { Host } from './Host';
import { Port } from './Port';
import { Path } from './Path';
import { Query } from './Query';
import { Fragment } from './Fragment';
import { UserName } from './UserName';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class Components {
  constructor(
    readonly scheme: Scheme,
    readonly userName: UserName,
    readonly password: Password,
    readonly host: Host,
    readonly port: Port,
    readonly path: Path,
    readonly query: Query,
    readonly fragment: Fragment
  ) {
  }

  toArray(): [Scheme, UserName, Password, Host, Port, Path, Query, Fragment] {
    return [this.scheme, this.userName, this.password, this.host, this.port, this.path, this.query, this.fragment];
  }

  clone(update: Partial<Components>): Components {
    return new Components(
      update.scheme || this.scheme,
      update.userName || this.userName,
      update.password || this.password,
      update.host || this.host,
      update.port || this.port,
      update.path || this.path,
      update.query || this.query,
      update.fragment || this.fragment
    );
  }
}
