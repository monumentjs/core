import {XmlNode} from './XmlNode';
import {Assert} from '../../../Core/Assertion/Assert';


export class XmlComment extends XmlNode {
    private _text: string = '';
    
    
    public get text(): string {
        return this._text;
    }
    
    
    public set text(value: string) {
        Assert.argument('value', value).notNull();

        this._text = value/*.trim().replace(/\s+/g, ' ')*/;
    }
    
    
    public constructor(text: string = '') {
        super('');

        this.text = text;
    }
}
