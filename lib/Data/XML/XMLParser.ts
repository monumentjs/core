import {TextParser} from '../../System/Text/TextParser';
import XMLDocument from './XMLDocument';
import XMLNode from './XMLNode';
import XMLTextNode from './XMLTextNode';
import XMLCommentNode from './XMLCommentNode';
import XMLParserState from './XMLParserState';
import XMLCharacterData from './XMLCharacterData';


export default class XMLParser extends TextParser<XMLParserState, XMLDocument> {
    private _document: XMLDocument = new XMLDocument();
    
    
    public get value(): XMLDocument {
        return this._document;
    }

    
    protected getInitialState(): XMLParserState {
        let state: XMLParserState = new XMLParserState();

        state.currentNode = this._document;

        return state;
    }
    
    
    protected reduce(currentChar: string, index: number): void {
        this.updateState(currentChar);
    
        this.state.previousText.append(currentChar);
    }
    
    
    private updateState(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {isOpenTag, isCloseTag, isComment, isCData} = state;
        
        if (isOpenTag) {
            this.onOpenTag(currentChar);
        } else if (isCloseTag) {
            this.onCloseTag(currentChar);
        } else if (isComment) {
            this.onComment(currentChar);
        } else if (isCData) {
            this.onCData(currentChar);
        } else {
            this.onTextContent(currentChar);
        }
    }
    
    
    // Open tag context
    
    
    private onOpenTag(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {
            isOpenTagStart, isOpenTagName, isOpenTagEnd,
            isAttribute
        } = state;
        let isOpenTagBody: boolean = !isOpenTagStart && !isOpenTagName && !isOpenTagEnd && !isAttribute;
        
        if (isOpenTagStart) {                                       // <
            this.onOpenTagStart(currentChar);
        } else if (isOpenTagName) {                                 // <{element_name}
            this.onOpenTagName(currentChar);
        } else if (isOpenTagBody) {                                 // <{element_name}{tag_body(not:attribute)}>
            this.onOpenTagBody(currentChar);
        } else if (isOpenTagEnd) {
            this.onOpenTagEnd(currentChar);
        } else if (isAttribute) {
            this.onAttribute(currentChar);
        }
    }
    
    
    private onOpenTagStart(currentChar: string): void {
        let state: XMLParserState = this.state;
        
        if (currentChar === '!') {                              // <!
            this.setOpenTagGroup(false, false, false, false);
            this.setCommentGroup(true, true, false, false);
        } else if (currentChar === '/') {                       // </
            this.setOpenTagGroup(false, false, false, false);
            this.setCloseTagGroup(true, false, true, false);
        } else {
            this.setOpenTagGroup(true, false, true, false);
            state.nodeName += currentChar;
        }
    }
    
    
    private onOpenTagName(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {previousText} = state;
        
        if (this.isSpaceChar(currentChar)) {                    // <{element_name}{space}
            this.createNewNode();
            this.setOpenTagGroup(true, false, false, false);
        } else if (currentChar === '>') {                       // <{element_name}>
            this.createNewNode();
            this.setOpenTagGroup(false, false, false, false);
            if (previousText.lastChar === '/') {                // <{element_name}/>
                this.switchToPreviousNode();
            } else if (previousText.lastChar === '?') {         // <{element_name}?>
                this.switchToPreviousNode();
            }
        } else {
            state.nodeName += currentChar;
        }
    }
    
    
    private onOpenTagBody(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {previousText} = state;
        
        if (!this.isSpaceChar(currentChar)) {
            if (currentChar === '>') {
                this.createNewNode();
                this.setOpenTagGroup(false, false, false, false);
                if (previousText.lastChar === '/') {            // <{element_name}{tag_body}/>
                    this.switchToPreviousNode();
                    this.setOpenTagGroup(false, false, false, false);
                    this.setAttributeNameGroup(false, false, false);
                    this.setAttributeValueGroup(false, false, false);
                }
            } else if (currentChar === '?') {                   // <?xml {attributes...}?>
                this.switchToPreviousNode();
                this.setOpenTagGroup(true, false, false, true);
                this.setAttributeNameGroup(false, false, false);
                this.setAttributeValueGroup(false, false, false);
            } else {                                            // <{element_name} {attribute_name}
                this.setOpenTagGroup(true, false, false, false);
                this.setAttributeNameGroup(true, true, false);
                state.nodeAttributeName += currentChar;
            }
        }
    }
    
    
    private onOpenTagEnd(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === '>' && previousText.lastChar === '?') {
            this.setOpenTagGroup(false, false, false, false);
        }
    }
    
    
    // Attribute context
    
    
    private onAttribute(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {
            isAttributeName, isAttributeNameStart, isAttributeNameEnd,
            isAttributeValue, isAttributeValueStart
        } = state;
        
        if (isAttributeName) {
            if (isAttributeNameStart) {
                this.onAttributeNameStart(currentChar);
            } else if (isAttributeNameEnd) {
                this.onAttributeNameEnd(currentChar);
            }
        } else if (isAttributeValue) {
            if (isAttributeValueStart) {
                this.onAttributeValueStart(currentChar);
            }
        }
    }
    
    
    private onAttributeNameStart(currentChar: string): void {
        let state: XMLParserState = this.state;
        
        if (!this.isAcceptableAttributeNameChar(currentChar)) { // ... {attribute_name}=
            this.setAttributeNameGroup(true, false, true);
        } else {
            state.nodeAttributeName += currentChar;
        }
    }
    
    
    private onAttributeNameEnd(currentChar: string): void {
        let state: XMLParserState = this.state;
        
        if (currentChar === `"`) {                          // ... {attribute_name}="
            state.nodeAttributeQuot = currentChar;
            this.setAttributeNameGroup(false, false, false);
            this.setAttributeValueGroup(true, true, false);
        }
    }
    
    
    private onAttributeValueStart(currentChar: string): void {
        let state: XMLParserState = this.state;
        
        if (this.isAttributeValueEndChar(currentChar)) {    // ... {attribute_name}="{attribute_value}"
            this.createNodeAttribute();
            this.setAttributeValueGroup(false, false, false);
            this.setAttributeNameGroup(false, false, false);
        } else {
            state.nodeAttributeValue += currentChar;
        }
    }
    
    
    // Close tag context
    
    
    private onCloseTagName(currentChar: string): void {
        let state: XMLParserState = this.state;
        
        if (this.isAcceptableTagNameChar(currentChar)) {
            state.nodeName += currentChar;
        } else {
            this.switchToPreviousNode();
            this.setCloseTagGroup(false, false, false, false);
        }
    }
    
    
    private onCloseTag(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {
            isCloseTagName
        } = state;
        
        if (isCloseTagName) {
            this.onCloseTagName(currentChar);
        }
    }
    
    
    // Comment context
    
    
    private onComment(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {
            isCommentStart, isCommentText, isCommentEnd
        } = state;
        
        if (isCommentStart) {                                       // <!
            this.onCommentStart(currentChar);
        } else if (isCommentText) {
            this.onCommentText(currentChar);
        } else if (isCommentEnd) {                                  // --
            this.onCommentEnd(currentChar);
        }
    }
    
    
    private onCommentStart(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === '-') {
            if (previousText.lastChar === '-') {                // <!--
                this.setCommentGroup(true, false, true, false);
            }
        } else if (currentChar === '[') {                       // <![
            this.setCommentGroup(false, false, false, false);
            this.setCDataGroup(true, true, false, false);
        }
    }
    
    
    private onCommentText(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === '-') {
            if (previousText.lastChar === '-') {                // --
                this.setCommentGroup(true, false, false, true);
            } else {
                state.commentTextContent += currentChar;
            }
        } else {
            state.commentTextContent += currentChar;
        }
    }
    
    
    private onCommentEnd(currentChar: string): void {
        if (currentChar === '>') {                              // -->
            this.createCommentNode();
            this.setCommentGroup(false, false, false, false);
        }
    }
    
    
    // CData context
    
    
    private onCData(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {
            isCDataStart, isCDataText, isCDataEnd
        } = state;
        
        if (isCDataStart) {                                         // <![
            this.onCDataStart(currentChar);
        } else if (isCDataText) {
            this.onCDataText(currentChar);
        } else if (isCDataEnd) {                                    // ]]
            this.onCDataEnd(currentChar);
        }
    }
    
    
    private onCDataStart(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === '[') {
            if (previousText.endsWith('<![CDATA')) {            // <![CDATA[
                this.setCDataGroup(true, false, true, true);
            }
        }
    }
    
    
    private onCDataText(currentChar: string): void {
        let state: XMLParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === ']') {
            if (previousText.lastChar === ']') {                // ]]
                this.setCDataGroup(true, false, false, true);
            } else {
                state.charDataContent += currentChar;
            }
        } else {
            state.charDataContent += currentChar;
        }
    }
    
    
    private onCDataEnd(currentChar: string): void {
        if (currentChar === '>') {                              // ]]>
            this.createCDataNode();
            this.setCDataGroup(false, false, false, false);
        }
    }
    
    
    // Text content context
    
    
    private onTextContent(currentChar: string): void {
        let state: XMLParserState = this.state;
    
        if (currentChar === '<') {
            this.createTextNode();
            this.setOpenTagGroup(true, true, false, false);
        } else {
            state.nodeTextContent += currentChar;
        }
    }
    
    
    // State flags setters
    
    
    private setOpenTagGroup(isGroup: boolean, isStart: boolean, isName: boolean, isEnd: boolean): void {
        let state = this.state;
        
        state.isOpenTag = isGroup;
        state.isOpenTagStart = isStart;
        state.isOpenTagName = isName;
        state.isOpenTagEnd = isEnd;
    }
    
    
    private setCommentGroup(isGroup: boolean, isStart: boolean, isText: boolean, isEnd: boolean): void {
        let state = this.state;
    
        state.isComment = isGroup;
        state.isCommentStart = isStart;
        state.isCommentText = isText;
        state.isCommentEnd = isEnd;
    }
    
    
    private setCDataGroup(isGroup: boolean, isStart: boolean, isText: boolean, isEnd: boolean): void {
        let state = this.state;
    
        state.isCData = isGroup;
        state.isCDataStart = isStart;
        state.isCDataText = isText;
        state.isCDataEnd = isEnd;
    }
    
    
    private setCloseTagGroup(isGroup: boolean, isStart: boolean, isName: boolean, isEnd: boolean): void {
        let state = this.state;
    
        state.isCloseTag = isGroup;
        state.isCloseTagStart = isStart;
        state.isCloseTagName = isName;
        state.isCloseTagEnd = isEnd;
    }
    
    
    private setAttributeNameGroup(isGroup: boolean, isStart: boolean, isEnd: boolean): void {
        let state = this.state;
    
        state.isAttributeNameStart = isStart;
        state.isAttributeNameEnd = isEnd;
        state.isAttributeName = isGroup;
        state.isAttribute = state.isAttributeName || state.isAttributeValue;
    }
    
    
    private setAttributeValueGroup(isGroup: boolean, isStart: boolean, isEnd: boolean): void {
        let state = this.state;
    
        state.isAttributeValueStart = isStart;
        state.isAttributeValueEnd = isEnd;
        state.isAttributeValue = isGroup;
        state.isAttribute = state.isAttributeName || state.isAttributeValue;
    }
    
    
    // DOM tree creators
    
    
    private createNewNode(): void {
        let state = this.state;
    
        if (state.nodeName) {
            let newNode: XMLNode = new XMLNode(state.nodeName);

            state.currentNode.childNodes.add(newNode);

            state.currentNode = newNode;
            state.nodeName = '';
        }
    }
    
    
    private switchToPreviousNode(): void {
        let state = this.state;
    
        state.currentNode = state.currentNode.parentNode;
        state.nodeName = '';
    }
    
    
    private createTextNode(): void {
        let state = this.state;
    
        if (/^\s*$/.test(state.nodeTextContent) === false) {
            let xmlTextNode: XMLTextNode = new XMLTextNode(state.nodeTextContent);
            
            state.currentNode.childNodes.add(xmlTextNode);
            
            state.nodeTextContent = '';
        }
    }
    
    
    private createCommentNode(): void {
        let state = this.state;
        let xmlComment: XMLCommentNode = new XMLCommentNode(state.commentTextContent.slice(0, -1));
        
        state.currentNode.childNodes.add(xmlComment);
        
        state.commentTextContent = '';
    }
    
    
    private createCDataNode(): void {
        let state = this.state;
        let xmlCharacterData: XMLCharacterData = new XMLCharacterData(state.charDataContent.slice(0, -1));
        
        state.currentNode.childNodes.add(xmlCharacterData);
        
        state.charDataContent = '';
    }
    
    
    private createNodeAttribute(): void {
        let state = this.state;
    
        state.currentNode.attributes.set(state.nodeAttributeName, state.nodeAttributeValue);
        state.nodeAttributeQuot = '';
        state.nodeAttributeName = '';
        state.nodeAttributeValue = '';
    }
    
    
    // Tokens detectors
    
    
    private isSpaceChar(currentChar: string): boolean {
        return /^\s+$/i.test(currentChar);
    }
    
    
    private isAcceptableAttributeNameChar(currentChar: string): boolean {
        return !(this.isSpaceChar(currentChar) || currentChar === '=' || currentChar === '>');
    }
    
    
    private isAttributeValueEndChar(currentChar: string): boolean {
        let {nodeAttributeQuot, previousText} = this.state;
        
        return currentChar === nodeAttributeQuot && previousText.lastChar !== '\\';
    }
    
    
    private isAcceptableTagNameChar(currentChar: string): boolean {
        return currentChar !== '>';
    }
}

