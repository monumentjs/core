import { RuntimeException } from './RuntimeException';

/**
 * @author Alex Chugaev
 * @since 0.15.0
 */
export class NotImplementedException extends RuntimeException {
  constructor() {
    super(`Not implemented yet.`);
  }
}
