import {ArgumentAssertion} from './ArgumentAssertion';
import {RangeAssertion} from './RangeAssertion';


export namespace Assert {

    export function argument(argumentName: string, argumentValue: any): ArgumentAssertion {
        return new ArgumentAssertion(argumentName, argumentValue);
    }


    export function range(from: number, to: number): RangeAssertion {
        return new RangeAssertion(from, to);
    }
}
