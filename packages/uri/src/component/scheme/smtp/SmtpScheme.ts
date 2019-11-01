import { Scheme } from '../../Scheme';
import { PlainHost } from '../../host/PlainHost';
import { PortObject } from '../../PortObject';

export class SmtpScheme extends Scheme {
  constructor() {
    super('smtp', undefined, new PlainHost('localhost'), new PortObject(25));
  }
}
