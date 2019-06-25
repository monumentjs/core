import { RuntimeException } from './RuntimeException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class MethodNotImplementedException extends RuntimeException {
  constructor() {
    super(`Method is not implemented yet.`);
  }
}
