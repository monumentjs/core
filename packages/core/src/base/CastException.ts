import { RuntimeException } from '../exceptions/RuntimeException';
import { Type } from './Type';

export class CastException extends RuntimeException {
    public constructor(message: string);
    public constructor(message: string, cause: Error);
    public constructor(targetType: Type<any>);
    public constructor(targetType: Type<any>, cause: Error);
    public constructor(arg1: string | Type<any>, cause?: Error) {
        const message: string = typeof arg1 === 'string' ? arg1 : `Unable to case to type ${arg1.name}`;
        super(message, cause);
    }
}
