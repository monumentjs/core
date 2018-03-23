import {Cloneable} from '@monument/core/main/Cloneable';
import {TreeNode} from '@monument/tree-core/main/TreeNode';
import {XmlNodeAttributes} from './XmlNodeAttributes';


export class XmlNode extends TreeNode implements Cloneable<XmlNode> {
    private _nodeName: string;
    private _attributes: XmlNodeAttributes = new XmlNodeAttributes(this);


    public get nodeName(): string {
        return this._nodeName;
    }


    public get attributes(): XmlNodeAttributes {
        return this._attributes;
    }


    public constructor(nodeName: string) {
        super();

        this._nodeName = nodeName;
    }


    public clone(): XmlNode {
        let clonedNode: XmlNode = new XmlNode(this.nodeName);

        clonedNode.parentNode = this.parentNode;
        clonedNode.childNodes.addAll(this.childNodes);
        clonedNode._attributes = this.attributes.clone();

        return clonedNode;
    }
}

