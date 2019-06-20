import { InvalidOperationException } from '../../exceptions/InvalidOperationException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class EmptyQueueException extends InvalidOperationException {
  constructor() {
    super('Unable to perform operation on empty queue.');
  }
}
