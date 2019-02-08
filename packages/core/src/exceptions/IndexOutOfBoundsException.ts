import { RuntimeException } from './RuntimeException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class IndexOutOfBoundsException extends RuntimeException {
    public constructor(message: string);
    public constructor(index: number, length: number);
    public constructor(indexOrMessage: number | string, length?: number) {
        let message: string;

        if (typeof indexOrMessage === 'string') {
            message = indexOrMessage;
        } else {
            message = `Index out of bounds: index=${indexOrMessage}, length=${length}`;
        }

        super(message);
    }
}
