import { Port } from './Port';

export class EncodedPort extends Port {
  constructor(port?: string) {
    super(port != null ? parseInt(port, 10) : port);
  }
}
