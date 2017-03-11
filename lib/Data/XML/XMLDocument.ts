import XMLNode from './XMLNode';


export default class XMLDocument extends XMLNode {
    private _version: string;
    private _encoding: string;
    
    
    public get version(): string {
        return this._version;
    }
    
    
    public set version(value: string) {
        this._version = value;
    }
    
    
    public get encoding(): string {
        return this._encoding;
    }
    
    
    public set encoding(value: string) {
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
