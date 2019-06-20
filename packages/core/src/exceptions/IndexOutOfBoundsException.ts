import { RuntimeException } from './RuntimeException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class IndexOutOfBoundsException extends RuntimeException {
  constructor(message: string);
  constructor(index: number, length: number);
  constructor(indexOrMessage: number | string, length?: number) {
    let message: string;

    if (typeof indexOrMessage === 'string') {
      message = indexOrMessage;
    } else {
      message = `Index out of bounds: index=${indexOrMessage}, length=${length}`;
    }

    super(message);
  }
}
