import {ArgumentAssertion} from './ArgumentAssertion';
import {IEnumerable} from '../Collections/IEnumerable';
import {SequenceAssertion} from './SequenceAssertion';
import {RangeAssertion} from './RangeAssertion';
import {NumberAssertion} from './NumberAssertion';


export class Assert {
    public static number(value: number): NumberAssertion {
        return new NumberAssertion(value);
    }


    public static argument(argumentName: string, argumentValue: any): ArgumentAssertion {
        return new ArgumentAssertion(argumentName, argumentValue);
    }


    public static sequence(sequence: IEnumerable<any>): SequenceAssertion {
        return new SequenceAssertion(sequence);
    }


    public static range(from: number, to: number): RangeAssertion {
        return new RangeAssertion(from, to);
    }

}