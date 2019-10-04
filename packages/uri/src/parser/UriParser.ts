import { Parser } from '@monument/text';
import { UriFormatException } from '../exception';
import { Components, EncodedFragment, EncodedHost, EncodedPassword, EncodedPort, EncodedUserName, Path, Query, Scheme } from '../component';

const URI_PATTERN: RegExp = /^((([^:]+):)?\/\/)?(([^:@\/]+)(:([^@\/]+))?@)?([^.@:\/?#][^@:\/?#]*)?(:(\d+))?([.]{0,2}\/[^?#]*)?(\?([^#]*))?(#(.*))?$/;
//                              | schema         | username   | password    | host                 | port   | path             | search    | fragment |

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class UriParser implements Parser<Components> {
  canParse(source: string): boolean {
    return URI_PATTERN.test(source);
  }

  parse(source: string): Components {
    const parts: RegExpExecArray | null = URI_PATTERN.exec(source);

    if (parts == null) {
      throw new UriFormatException(`URI has invalid format`);
    }

    const scheme = new Scheme(parts[3]);
    const userName = new EncodedUserName(parts[5]);
    const password = new EncodedPassword(parts[7]);
    const host = new EncodedHost(parts[8]);
    const port = new EncodedPort(parts[10]);
    const path = new Path(parts[11]);
    const query = new Query(parts[13]);
    const fragment = new EncodedFragment(parts[15]);

    return new Components(scheme, userName, password, host, port, path, query, fragment);
  }
}
