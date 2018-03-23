import {RandomCharSequenceGenerator} from './RandomCharSequenceGenerator';
import {Set} from '../../collections-core/main/Set';
import {ListSet} from '../../collections/main/ListSet';


export class UniqueCharSequenceGenerator extends RandomCharSequenceGenerator {
    private _knownSequences: Set<string> = new ListSet();
    private _maxAttempts: number;


    public get maxAttempts(): number {
        return this._maxAttempts;
    }


    public constructor(maxAttempts: number) {
        super();

        this._maxAttempts = maxAttempts;
    }


    public generate(length: number, charset: string): string {
        let attempt: number = 0;
        let value: string;

        do {
            value = super.generate(length, charset);

            if (this._knownSequences.add(value)) {
                break;
            }

            attempt++;
        } while (attempt > this.maxAttempts);

        return value;
    }
}
