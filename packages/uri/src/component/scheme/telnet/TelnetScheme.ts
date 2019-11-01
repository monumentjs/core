import { Scheme } from '../../Scheme';
import { PlainHost } from '../../host/PlainHost';
import { PortObject } from '../../PortObject';

export class TelnetScheme extends Scheme {
  constructor() {
    super('telnet', undefined, new PlainHost('localhost'), new PortObject(23));
  }
}
