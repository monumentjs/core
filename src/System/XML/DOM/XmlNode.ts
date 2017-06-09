import {Node} from '../../../Core/Data/Structures/Tree/Node';
import {XmlNodeList} from './XmlNodeList';
import {XmlNodeAttributes} from './XmlNodeAttributes';
import {ICloneable} from '../../../Core/types';


export class XmlNode extends Node implements ICloneable<XmlNode> {
    protected _parentNode: XmlNode;
    protected _childNodes: XmlNodeList = new XmlNodeList(this);
    protected _attributes: XmlNodeAttributes = new XmlNodeAttributes(this);


    public get parentNode(): XmlNode {
        return this._parentNode;
    }


    public set parentNode(value: XmlNode) {
        this._parentNode = value;
    }

    
    public get attributes(): XmlNodeAttributes {
        return this._attributes;
    }
    
    
    public get childNodes(): XmlNodeList {
        return this._childNodes;
    }


    public clone(): XmlNode {
        let clonedNode: XmlNode = new XmlNode(this.nodeName);
        
        clonedNode._parentNode = this.parentNode;
        clonedNode._childNodes = this.childNodes.clone();
        clonedNode._attributes = this.attributes.clone();
        
        return clonedNode;
    }
}

