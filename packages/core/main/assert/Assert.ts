import {ArgumentAssertion} from './ArgumentAssertion';
import {RangeAssertion} from './RangeAssertion';
import {NumberAssertion} from './NumberAssertion';
import {PropertyAssertion} from './PropertyAssertion';


export namespace Assert {

    export function number(value: number): NumberAssertion {
        return new NumberAssertion(value);
    }


    export function property(propertyName: string, propertyValue: any): PropertyAssertion {
        return new PropertyAssertion(propertyName, propertyValue);
    }


    export function argument(argumentName: string, argumentValue: any): ArgumentAssertion {
        return new ArgumentAssertion(argumentName, argumentValue);
    }


    export function range(from: number, to: number): RangeAssertion {
        return new RangeAssertion(from, to);
    }
}
