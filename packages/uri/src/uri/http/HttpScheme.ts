import { argument } from '@monument/assert';
import { Scheme } from '../../component/Scheme';
import { SchemeRules } from '../../base/component/scheme/SchemeRules';
import { PortObject } from '../../component/PortObject';
import { HostObject } from '../../component/HostObject';

const SCHEME_VARIANTS = ['http', 'https', undefined];
const DEFAULT_PORTS = [80, 443, undefined];

export class HttpScheme extends Scheme {
  constructor(scheme: string | undefined) {
    argument(SCHEME_VARIANTS.includes(scheme));

    const rules = new SchemeRules();
    const defaultHost = new HostObject('localhost');
    const defaultPort = new PortObject(DEFAULT_PORTS[SCHEME_VARIANTS.indexOf(scheme)]);

    super(scheme, rules, defaultHost, defaultPort);
  }
}
