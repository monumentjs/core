import {XmlNode} from './XmlNode';


export class XmlComment extends XmlNode {
    private _text: string = '';


    public get text(): string {
        return this._text;
    }


    public set text(value: string) {
        this._text = value/*.trim().replace(/\s+/g, ' ')*/;
    }


    public constructor(text: string = '') {
        super('');

        this.text = text;
    }
}
