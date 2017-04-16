import XMLNode from './XMLNode';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export default class XMLDocument extends XMLNode {
    private _version: string = '';
    private _encoding: string = '';
    
    
    public get version(): string {
        return this._version;
    }
    
    
    public set version(value: string) {
        assertArgumentNotNull('value', value);

        this._version = value;
    }
    
    
    public get encoding(): string {
        return this._encoding;
    }
    
    
    public set encoding(value: string) {
        assertArgumentNotNull('value', value);

        this._encoding = value;
    }
    
    
    public constructor() {
        super('');
    }
    
    
    public toString(): string {
        return this.childNodes.toArray().map((childNode: XMLNode) => {
            return childNode.toString();
        }).join('\n');
    }
}
