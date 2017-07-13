import { ArgumentAssertion } from './ArgumentAssertion';
import { IEnumerable } from '../Collections/IEnumerable';
import { SequenceAssertion } from './SequenceAssertion';
import { RangeAssertion } from './RangeAssertion';
import { NumberAssertion } from './NumberAssertion';
export declare class Assert {
    static number(value: number): NumberAssertion;
    static argument(argumentName: string, argumentValue: any): ArgumentAssertion;
    static sequence(sequence: IEnumerable<any>): SequenceAssertion;
    static range(from: number, to: number): RangeAssertion;
}
