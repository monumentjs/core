import {IJSONSerializable} from '../types';


export class Exception extends Error implements IJSONSerializable<string> {
    public readonly timestamp: number = Date.now();
    public readonly helpInfo: string = '';
    public readonly helpLink: string = '';


    public constructor(message: string) {
        super(message);

        this.name = this.constructor.name;
    }


    public toString(): string {
        let error: string = `${this.name}: ${this.message}\n`;

        if (this.helpInfo) {
            error += `Help information:\n${this.helpInfo}\n`;
        }

        if (this.helpLink) {
            error += `See: ${this.helpLink}\n`;
        }

        error += `Stack:\n${this.stack}\n`;

        return error;
    }


    public toJSON(): string {
        return this.toString();
    }
}
