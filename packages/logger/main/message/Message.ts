import {TemplateString} from '@monument/text/main/TemplateString';
import {Parameter} from './Parameter';


export class Message {
    private readonly _template: string;
    private readonly _parameters: Parameter[];
    private readonly _error?: Error;
    private readonly _text: string;


    public get template(): string {
        return this._template;
    }


    public get parameters(): Parameter[] {
        return this._parameters;
    }


    public get error(): Error | undefined {
        return this._error;
    }


    public get text(): string {
        return this._text;
    }


    public constructor(template: string, error?: Error, ...parameters: Parameter[]) {
        this._template = template;
        this._error = error;
        this._parameters = parameters;
        this._text = new TemplateString(template).fillByPositions(parameters);
    }
}
