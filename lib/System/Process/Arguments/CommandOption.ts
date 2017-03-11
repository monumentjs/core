import {IKeyValuePair} from '../../../Core/Collections/IKeyValuePair';
import TextTransform from '../../Text/TextTransform';


export default class CommandOption implements IKeyValuePair<string, string|boolean> {
    private _key: string;
    private _value: string|boolean;
    
    
    public get key(): string {
        return this._key;
    }
    
    
    public get value(): string|boolean {
        return this._value;
    }
    
    
    public get isLogical(): boolean {
        return typeof this._value === 'boolean';
    }
    
    
    public constructor(key: string, value: string|boolean) {
        this._key = TextTransform.toCamelCase(key);
        this._value = value;
    }
    
    
    public get rawKey(): string {
        let rawKey: string = TextTransform.toKebabCase(this._key);
        
        if (this.key.length === 1) {
            rawKey = `-${rawKey}`;
        } else {
            rawKey = `--${rawKey}`;
        }
        
        return rawKey;
    }
    
    
    public get rawValue(): string|boolean {
        if (this.isLogical) {
            return this._value;
        } else {
            if (/\s/.test(this._value as string)) {
                return JSON.stringify(this._value);
            } else {
                return this._value;
            }
        }
    }
    
    
    public toString(): string {
        if (this.isLogical) {
            return this.rawKey;
        } else {
            return `${this.rawKey}=${this.rawValue}`;
        }
    }
}

