import { Scheme } from '../../Scheme';
import { PlainHost } from '../../host/PlainHost';
import { PortObject } from '../../PortObject';

export class FtpScheme extends Scheme {
  constructor() {
    super('ftp', undefined, new PlainHost('localhost'), new PortObject(21));
  }
}
