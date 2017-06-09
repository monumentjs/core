import {XmlNode} from './XmlNode';
import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';


export class XmlComment extends XmlNode {
    private _text: string = '';
    
    
    public get text(): string {
        return this._text;
    }
    
    
    public set text(value: string) {
        assertArgumentNotNull('value', value);

        this._text = value/*.trim().replace(/\s+/g, ' ')*/;
    }
    
    
    public constructor(text: string = '') {
        super('');

        this.text = text;
    }
}
