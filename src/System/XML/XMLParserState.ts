import CappedString from '../../Core/Text/CappedString';
import XMLNode from './XMLNode';


export default class XMLParserState {
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
    
    public isNodeTextContent: boolean = false;
    
    public nodeName: string = '';
    public nodeAttributeName: string = '';
    public nodeAttributeValue: string = '';
    public nodeAttributeQuot: string = '';
    public nodeTextContent: string = '';
    public commentTextContent: string = '';
    public charDataContent: string = '';
    
    public currentNode: XMLNode = null;
    
    public previousText: CappedString = new CappedString(10);
}

