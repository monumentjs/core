import {XmlNode} from './XmlNode';


export class XmlTextNode extends XmlNode {
    public constructor(text: string = '') {
        super('');

        this.textContent = text;
    }
}
