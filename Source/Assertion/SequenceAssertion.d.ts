import { IEnumerable } from '../Collections/IEnumerable';
export declare class SequenceAssertion {
    private _sequence;
    constructor(sequence: IEnumerable<any>);
    containsSlice(offset?: number, length?: number): void;
    containsIndex(index: number): void;
}
