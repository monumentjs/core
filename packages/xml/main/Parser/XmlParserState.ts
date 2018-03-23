import {CappedString} from '@monument/text/main/CappedString';
import {TextParserContext} from '@monument/text-parser-core/main/TextParserContext';
import {XmlNode} from '../DOM/XmlNode';
import {XmlTextNode} from '../DOM/XmlTextNode';
import {XmlComment} from '../DOM/XmlComment';
import {XmlCharacterData} from '../DOM/XmlCharacterData';
import {XmlDocument} from '../DOM/XmlDocument';


export class XmlParserState extends TextParserContext<XmlDocument> {
    public isOpenTag: boolean = false;
    public isOpenTagStart: boolean = false;
    public isOpenTagName: boolean = false;
    public isOpenTagEnd: boolean = false;

    public isCloseTag: boolean = false;
    public isCloseTagStart: boolean = false;
    public isCloseTagName: boolean = false;
    public isCloseTagEnd: boolean = false;

    public isAttribute: boolean = false;
    public isAttributeName: boolean = false;
    public isAttributeNameStart: boolean = false;
    public isAttributeNameEnd: boolean = false;
    public isAttributeValue: boolean = false;
    public isAttributeValueStart: boolean = false;
    public isAttributeValueEnd: boolean = false;

    public isComment: boolean = false;
    public isCommentStart: boolean = false;
    public isCommentText: boolean = false;
    public isCommentEnd: boolean = false;

    public isCData: boolean = false;
    public isCDataStart: boolean = false;
    public isCDataText: boolean = false;
    public isCDataEnd: boolean = false;

    public nodeName: string = '';
    public nodeAttributeName: string = '';
    public nodeAttributeValue: string = '';
    public nodeAttributeQuot: string = '';
    public nodeTextContent: string = '';
    public commentTextContent: string = '';
    public charDataContent: string = '';

    public currentNode: XmlNode | undefined;

    public previousText: CappedString = new CappedString(10);


    // State flags setters


    public setOpenTagGroup(isGroup: boolean, isStart: boolean, isName: boolean, isEnd: boolean): void {
        this.isOpenTag = isGroup;
        this.isOpenTagStart = isStart;
        this.isOpenTagName = isName;
        this.isOpenTagEnd = isEnd;
    }


    public setCommentGroup(isGroup: boolean, isStart: boolean, isText: boolean, isEnd: boolean): void {
        this.isComment = isGroup;
        this.isCommentStart = isStart;
        this.isCommentText = isText;
        this.isCommentEnd = isEnd;
    }


    public setCDataGroup(isGroup: boolean, isStart: boolean, isText: boolean, isEnd: boolean): void {
        this.isCData = isGroup;
        this.isCDataStart = isStart;
        this.isCDataText = isText;
        this.isCDataEnd = isEnd;
    }


    public setCloseTagGroup(isGroup: boolean, isStart: boolean, isName: boolean, isEnd: boolean): void {
        this.isCloseTag = isGroup;
        this.isCloseTagStart = isStart;
        this.isCloseTagName = isName;
        this.isCloseTagEnd = isEnd;
    }


    public setAttributeNameGroup(isGroup: boolean, isStart: boolean, isEnd: boolean): void {
        this.isAttributeNameStart = isStart;
        this.isAttributeNameEnd = isEnd;
        this.isAttributeName = isGroup;
        this.isAttribute = this.isAttributeName || this.isAttributeValue;
    }


    public setAttributeValueGroup(isGroup: boolean, isStart: boolean, isEnd: boolean): void {
        this.isAttributeValueStart = isStart;
        this.isAttributeValueEnd = isEnd;
        this.isAttributeValue = isGroup;
        this.isAttribute = this.isAttributeName || this.isAttributeValue;
    }


    // DOM tree creators


    public createNewNode(): void {
        if (this.nodeName) {
            let newNode: XmlNode = new XmlNode(this.nodeName);

            if (this.currentNode != null) {
                this.currentNode.childNodes.add(newNode);
            }

            this.currentNode = newNode;
            this.nodeName = '';
        }
    }


    public switchToParentNode(): void {
        if (this.currentNode != null) {
            this.currentNode = this.currentNode.parentNode as XmlNode;
        }

        this.nodeName = '';
    }


    public createTextNode(): void {
        if (/^\s*$/.test(this.nodeTextContent) === false) {
            let xmlTextNode: XmlTextNode = new XmlTextNode(this.nodeTextContent);

            if (this.currentNode != null) {
                this.currentNode.childNodes.add(xmlTextNode);
            }

            this.nodeTextContent = '';
        }
    }


    public createCommentNode(): void {
        let xmlComment: XmlComment = new XmlComment(this.commentTextContent.slice(0, -1));

        if (this.currentNode != null) {
            this.currentNode.childNodes.add(xmlComment);
        }

        this.commentTextContent = '';
    }


    public createCDataNode(): void {
        let xmlCharacterData: XmlCharacterData = new XmlCharacterData(this.charDataContent.slice(0, -1));

        if (this.currentNode != null) {
            this.currentNode.childNodes.add(xmlCharacterData);
        }

        this.charDataContent = '';
    }


    public createNodeAttribute(): void {
        if (this.currentNode != null) {
            this.currentNode.attributes.put(this.nodeAttributeName, this.nodeAttributeValue);
        }

        this.nodeAttributeQuot = '';
        this.nodeAttributeName = '';
        this.nodeAttributeValue = '';
    }
}
