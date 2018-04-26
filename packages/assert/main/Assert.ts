import {Countable} from '@monument/collections/main/Countable';
import {ArgumentAssertion} from './ArgumentAssertion';
import {SequenceAssertion} from './SequenceAssertion';
import {RangeAssertion} from './RangeAssertion';
import {NumberAssertion} from './NumberAssertion';
import {PropertyAssertion} from './PropertyAssertion';
import {AssertionException} from './AssertionException';


export namespace Assert {
    export function isTrue(value: boolean, message: string): void {
        if (!value) {
            throw new AssertionException(message);
        }
    }


    export function isFalse(value: boolean, message: string): void {
        if (value) {
            throw new AssertionException(message);
        }
    }


    export function isNull(value: any, message: string): void {
        if (value != null) {
            throw new AssertionException(message);
        }
    }


    export function notNull(value: any, message: string): void {
        if (value == null) {
            throw new AssertionException(message);
        }
    }


    export function hasText(value: string, message: string): void {
        if (value.length === 0) {
            throw new AssertionException(message);
        }
    }


    export function number(value: number): NumberAssertion {
        return new NumberAssertion(value);
    }


    export function property(propertyName: string, propertyValue: any): PropertyAssertion {
        return new PropertyAssertion(propertyName, propertyValue);
    }


    export function argument(argumentName: string, argumentValue: any): ArgumentAssertion {
        return new ArgumentAssertion(argumentName, argumentValue);
    }


    export function sequence(value: Countable): SequenceAssertion {
        return new SequenceAssertion(value);
    }


    export function range(from: number, to: number): RangeAssertion {
        return new RangeAssertion(from, to);
    }
}
