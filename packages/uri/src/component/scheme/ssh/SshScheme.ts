import { Scheme } from '../../Scheme';
import { PlainHost } from '../../host/PlainHost';
import { PortObject } from '../../PortObject';

export class SshScheme extends Scheme {
  constructor() {
    super('ssh', undefined, new PlainHost('localhost'), new PortObject(22));
  }
}
