import {XmlNode} from './XmlNode';


export class XmlCharacterData extends XmlNode {
    public constructor(text: string = '') {
        super('');

        this.textContent = text;
    }
}
