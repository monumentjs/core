import {TextParser} from '../../Core/Text/Parsing/TextParser';
import {XmlDocument} from './DOM/XmlDocument';
import {XmlParserState} from './Parser/XmlParserState';


export class XmlParser extends TextParser<XmlParserState, XmlDocument> {
    private _document: XmlDocument = new XmlDocument();
    
    
    public get value(): XmlDocument {
        return this._document;
    }

    
    protected getInitialState(): XmlParserState {
        let state: XmlParserState = new XmlParserState();

        state.currentNode = this._document;

        return state;
    }
    
    
    protected reduce(currentChar: string, index: number): void {
        this.updateState(currentChar);
    
        this.state.previousText.append(currentChar);
    }
    
    
    private updateState(currentChar: string): void {
        let state: XmlParserState = this.state;
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
        let state: XmlParserState = this.state;
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
        let state: XmlParserState = this.state;
        
        if (currentChar === '!') {                              // <!
            state.setOpenTagGroup(false, false, false, false);
            state.setCommentGroup(true, true, false, false);
        } else if (currentChar === '/') {                       // </
            state.setOpenTagGroup(false, false, false, false);
            state.setCloseTagGroup(true, false, true, false);
        } else {
            state.setOpenTagGroup(true, false, true, false);
            state.nodeName += currentChar;
        }
    }
    
    
    private onOpenTagName(currentChar: string): void {
        let state: XmlParserState = this.state;
        let {previousText} = state;
        
        if (this.isSpaceChar(currentChar)) {                    // <{element_name}{space}
            state.createNewNode();
            state.setOpenTagGroup(true, false, false, false);
        } else if (currentChar === '>') {                       // <{element_name}>
            state.createNewNode();
            state.setOpenTagGroup(false, false, false, false);
            if (previousText.lastChar === '/') {                // <{element_name}/>
                state.switchToParentNode();
            } else if (previousText.lastChar === '?') {         // <{element_name}?>
                state.switchToParentNode();
            }
        } else {
            state.nodeName += currentChar;
        }
    }
    
    
    private onOpenTagBody(currentChar: string): void {
        let state: XmlParserState = this.state;
        let {previousText} = state;
        
        if (!this.isSpaceChar(currentChar)) {
            if (currentChar === '>') {
                state.createNewNode();
                state.setOpenTagGroup(false, false, false, false);
                if (previousText.lastChar === '/') {            // <{element_name}{tag_body}/>
                    state.switchToParentNode();
                    state.setOpenTagGroup(false, false, false, false);
                    state.setAttributeNameGroup(false, false, false);
                    state.setAttributeValueGroup(false, false, false);
                }
            } else if (currentChar === '?') {                   // <?xml {attributes...}?>
                state.switchToParentNode();
                state.setOpenTagGroup(true, false, false, true);
                state.setAttributeNameGroup(false, false, false);
                state.setAttributeValueGroup(false, false, false);
            } else {                                            // <{element_name} {attribute_name}
                state.setOpenTagGroup(true, false, false, false);
                state.setAttributeNameGroup(true, true, false);
                state.nodeAttributeName += currentChar;
            }
        }
    }
    
    
    private onOpenTagEnd(currentChar: string): void {
        let state: XmlParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === '>' && previousText.lastChar === '?') {
            state.setOpenTagGroup(false, false, false, false);
        }
    }
    
    
    // Attribute context
    
    
    private onAttribute(currentChar: string): void {
        let state: XmlParserState = this.state;
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
        let state: XmlParserState = this.state;
        
        if (!this.isAcceptableAttributeNameChar(currentChar)) { // ... {attribute_name}=
            state.setAttributeNameGroup(true, false, true);
        } else {
            state.nodeAttributeName += currentChar;
        }
    }
    
    
    private onAttributeNameEnd(currentChar: string): void {
        let state: XmlParserState = this.state;
        
        if (currentChar === `"`) {                          // ... {attribute_name}="
            state.nodeAttributeQuot = currentChar;
            state.setAttributeNameGroup(false, false, false);
            state.setAttributeValueGroup(true, true, false);
        }
    }
    
    
    private onAttributeValueStart(currentChar: string): void {
        let state: XmlParserState = this.state;
        
        if (this.isAttributeValueEndChar(currentChar)) {    // ... {attribute_name}="{attribute_value}"
            state.createNodeAttribute();
            state.setAttributeValueGroup(false, false, false);
            state.setAttributeNameGroup(false, false, false);
        } else {
            state.nodeAttributeValue += currentChar;
        }
    }
    
    
    // Close tag context
    
    
    private onCloseTagName(currentChar: string): void {
        let state: XmlParserState = this.state;

        if (currentChar === '>') {
            state.switchToParentNode();
            state.setCloseTagGroup(false, false, false, false);
        } else {
            state.nodeName += currentChar;
        }
    }


    private onCloseTag(currentChar: string): void {
        let state: XmlParserState = this.state;

        if (state.isCloseTagName) {
            this.onCloseTagName(currentChar);
        }
    }
    
    
    // Comment context
    
    
    private onComment(currentChar: string): void {
        let state: XmlParserState = this.state;
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
        let state: XmlParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === '-') {
            if (previousText.lastChar === '-') {                // <!--
                state.setCommentGroup(true, false, true, false);
            }
        } else if (currentChar === '[') {                       // <![
            state.setCommentGroup(false, false, false, false);
            state.setCDataGroup(true, true, false, false);
        }
    }
    
    
    private onCommentText(currentChar: string): void {
        let state: XmlParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === '-') {
            if (previousText.lastChar === '-') {                // --
                state.setCommentGroup(true, false, false, true);
            } else {
                state.commentTextContent += currentChar;
            }
        } else {
            state.commentTextContent += currentChar;
        }
    }
    
    
    private onCommentEnd(currentChar: string): void {
        let state: XmlParserState = this.state;

        if (currentChar === '>') {                              // -->
            state.createCommentNode();
            state.setCommentGroup(false, false, false, false);
        }
    }
    
    
    // CData context
    
    
    private onCData(currentChar: string): void {
        let state: XmlParserState = this.state;
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
        let state: XmlParserState = this.state;

        if (currentChar === '[') {
            if (state.previousText.endsWith('<![CDATA')) {          // <![CDATA[
                state.setCDataGroup(true, false, true, true);
            }
        }
    }
    
    
    private onCDataText(currentChar: string): void {
        let state: XmlParserState = this.state;
        let {previousText} = state;
        
        if (currentChar === ']') {
            if (previousText.lastChar === ']') {                // ]]
                state.setCDataGroup(true, false, false, true);
            } else {
                state.charDataContent += currentChar;
            }
        } else {
            state.charDataContent += currentChar;
        }
    }
    
    
    private onCDataEnd(currentChar: string): void {
        let state: XmlParserState = this.state;

        if (currentChar === '>') {                              // ]]>
            state.createCDataNode();
            state.setCDataGroup(false, false, false, false);
        }
    }
    
    
    // Text content context
    
    
    private onTextContent(currentChar: string): void {
        let state: XmlParserState = this.state;
    
        if (currentChar === '<') {
            state.createTextNode();
            state.setOpenTagGroup(true, true, false, false);
        } else {
            state.nodeTextContent += currentChar;
        }
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
}

