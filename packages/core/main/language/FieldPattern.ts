import {Pattern} from './Pattern';
import {NullPointerException} from '../exceptions/NullPointerException';


export class FieldPattern implements Pattern {
    private readonly _key: string | symbol;
    private readonly _typeOf: string | undefined;
    private readonly _instanceOf: Function | undefined;

    public get key(): string | symbol {
        return this._key;
    }

    public constructor(key: string | symbol, typeOf?: string, instanceOf?: Function) {
        this._key = key;
        this._typeOf = typeOf;
        this._instanceOf = instanceOf;
    }

    public test(instance: any): boolean {
        if (instance == null) {
            throw new NullPointerException('Class instance is not defined.');
        }

        if (this._typeOf != null) {
            if (typeof instance[this._key] !== this._typeOf) {
                return false;
            }
        }

        if (this._instanceOf != null) {
            if ((instance[this._key] instanceof this._instanceOf) === false) {
                return false;
            }
        }

        return true;
    }

}
