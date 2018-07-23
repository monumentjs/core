import {Pattern} from './Pattern';
import {NullPointerException} from '../exceptions/NullPointerException';


export class MethodPattern implements Pattern {
    private readonly _key: string | symbol;

    public constructor(key: string | symbol) {
        this._key = key;
    }

    public test(instance: any): boolean {
        if (instance == null) {
            throw new NullPointerException('Class instance is not defined.');
        }

        return typeof instance[this._key] === 'function';
    }
}
