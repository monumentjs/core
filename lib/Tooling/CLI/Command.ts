import {IFormattable, Pool} from '../../Core/types';


export default class Command implements IFormattable {
    private _program: string;
    private _action: string;
    private _options: Pool<string>;


    get program(): string {
        return this._program;
    }


    get action(): string {
        return this._program;
    }


    get options(): Pool<string> {
        return this._options;
    }


    constructor(program: string, action: string = null, options: Pool<string> = Object.create(null)) {
        this._program = program;
        this._action = action;
        this._options = options;
    }


    public toString(): string {
        let parts: string[] = [
            this._program
        ];

        if (this._action) {
            parts.push(this._action);
        }

        Object.keys(this._options).forEach((name: string) => {
            let value: string = this._options[name];
            let option: string = name;

            if (typeof value !== 'boolean') {
                option += `=${value}`;
            }

            parts.push(option);
        });

        return parts.join(' ');
    }
}
