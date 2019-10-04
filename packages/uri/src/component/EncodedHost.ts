import { Host } from './Host';

export class EncodedHost extends Host {
  constructor(host?: string) {
    super(host && decodeURIComponent(host));
  }
}
