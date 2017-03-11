import XMLNode from './XMLNode';
import StringBuilder from '../../System/Text/StringBuilder';


export default class XMLCommentNode extends XMLNode {
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
    
    
    public toString(): string {
        let stringBuilder: StringBuilder = new StringBuilder();
    
        stringBuilder.appendTimes(' ', this.textIndentation);
        stringBuilder.append(`<!--${this.text}-->`);
    
        return stringBuilder.toString();
    }
}
