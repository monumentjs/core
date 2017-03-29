import TextTransform from '../Text/TextTransform';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import KeyValuePair from '../../Core/Collections/KeyValuePair';


export default class CommandOption extends KeyValuePair<string, string|boolean> {
    public get normalizedKey(): string {
        return TextTransform.toCamelCase(this.key);
    }


    public get isLogical(): boolean {
        return typeof this.value === 'boolean';
    }
    
    
    public constructor(key: string, value: string|boolean) {
        assertArgumentNotNull('key', key);
        assertArgumentNotNull('value', value);

        super(key, value);
    }
    
    
    public toString(): string {
        if (this.isLogical) {
            return this.key;
        } else {
            return `${this.key} ${this.getSafeValue()}`;
        }
    }


    private getSafeValue(): string {
        if (/\s/.test(this.value as string)) {
            return JSON.stringify(this.value);
        }

        return this.value as string;
    }
}

