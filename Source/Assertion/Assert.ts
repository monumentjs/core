import {ArgumentAssertion} from './ArgumentAssertion';
import {IEnumerable} from '../Collections/IEnumerable';
import {SequenceAssertion} from './SequenceAssertion';
import {RangeAssertion} from './RangeAssertion';
import {NumberAssertion} from './NumberAssertion';
import {PropertyAssertion} from './PropertyAssertion';


export class Assert {
    public static number(value: number): NumberAssertion {
        return new NumberAssertion(value);
    }


    public static property(propertyName: string, propertyValue: any): PropertyAssertion {
        return new PropertyAssertion(propertyName, propertyValue);
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
