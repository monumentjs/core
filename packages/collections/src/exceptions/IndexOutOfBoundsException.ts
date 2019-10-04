import { CollectionException } from './CollectionException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class IndexOutOfBoundsException extends CollectionException {
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
