import ArgumentNullException from '../Exceptions/ArgumentNullException';
import RangeException from '../Exceptions/RangeException';
import ArgumentTypeException from '../Exceptions/ArgumentTypeException';


export function assertArgumentNotNull(argumentName: string, argumentValue: any): void {
    if (argumentValue == null) {
        throw new ArgumentNullException(argumentName);
    }
}


export function assertArgumentType(argumentName: string, argumentValue: any, argumentClass: any): void {
    if (!(argumentValue instanceof argumentClass)) {
        throw new ArgumentTypeException(argumentName, argumentClass);
    }
}


export function assertArgumentBounds(argumentName: string, argumentValue: number, min: number, max: number): void {
    if (argumentValue < min || argumentValue > max) {
        throw new RangeException(`Argument ${argumentName} is out of bounds.`);
    }
}


export function assertLength(length: number, minimalLength: number = 0): void {
    if (length < minimalLength) {
        throw new RangeException(`Length is not valid.`);
    }
}


export function assertRangeBounds(start: number, end: number): void {
    if (start > end) {
        throw new RangeException(`Invalid range bounds.`);
    }
}

