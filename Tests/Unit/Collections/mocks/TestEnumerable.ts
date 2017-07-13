import {Enumerable} from '../../../../Source/Collections/Enumerable';


export class TestEnumerable extends Enumerable<string> {
    public getIterator(): Iterator<string> {
        let index: number = -1;

        return {
            next: (): IteratorResult<string> => {
                index += 1;

                let value: string = 'test-' + this[index];

                return {
                    value: value,
                    done: index >= this.length
                };
            }
        };
    }
}
