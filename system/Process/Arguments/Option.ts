import {KeyValuePair} from '../../../collections/main/KeyValuePair';


export class Option extends KeyValuePair<string, string | boolean> {
    public get isLogical(): boolean {
        return typeof this.value === 'boolean';
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

