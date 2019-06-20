import { RuntimeException } from '../exceptions/RuntimeException';
import { Type } from './Type';

export class CastException extends RuntimeException {
  constructor(message: string);
  constructor(message: string, cause: Error);
  constructor(targetType: Type<any>);
  constructor(targetType: Type<any>, cause: Error);
  constructor(arg1: string | Type<any>, cause?: Error) {
    const message: string = typeof arg1 === 'string' ? arg1 : `Unable to case to type ${arg1.name}`;
    super(message, cause);
  }
}
