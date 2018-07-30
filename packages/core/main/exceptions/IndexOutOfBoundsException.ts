import {RuntimeException} from './RuntimeException';


export class IndexOutOfBoundsException extends RuntimeException {
    public static testIndex(index: number, length: number) {
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException(index, length);
        }
    }

    public constructor(index: number, length: number) {
        super(`Index out of bounds: index = ${index}; length = ${length}.`);
    }
}
