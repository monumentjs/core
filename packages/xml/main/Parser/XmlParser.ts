import {AbstractStatefulParser} from '@monument/text-parser-core/main/AbstractStatefulParser';
import {XmlDocument} from '../DOM/XmlDocument';
import {XmlParserState} from './XmlParserState';


export class XmlParser extends AbstractStatefulParser<XmlParserState, XmlDocument> {
    private _document: XmlDocument;


    public get result(): XmlDocument {
        return this._document;
    }


    protected getInitialState(): XmlParserState {
        this._document = new XmlDocument();

        let state: XmlParserState = new XmlParserState();

        state.currentNode = this._document;

        return state;
    }


    protected next(): void {
        this.updateState();

        this.state.previousText.append(this.state.currentChar);
    }


    private updateState(): void {
        let {isOpenTag, isCloseTag, isComment, isCData} = this.state;

        if (isOpenTag) {
            this.onOpenTag();
        } else if (isCloseTag) {
            this.onCloseTag();
        } else if (isComment) {
            this.onComment();
        } else if (isCData) {
            this.onCData();
        } else {
            this.onTextContent();
        }
    }


    // Open tag context


    private onOpenTag(): void {
        let {isOpenTagStart, isOpenTagName, isOpenTagEnd, isAttribute} = this.state;
        let isOpenTagBody: boolean = !isOpenTagStart && !isOpenTagName && !isOpenTagEnd && !isAttribute;

        if (isOpenTagStart) {                                       // <
            this.onOpenTagStart();
        } else if (isOpenTagName) {                                 // <{element_name}
            this.onOpenTagName();
        } else if (isOpenTagBody) {                                 // <{element_name}{tag_body(not:attribute)}>
            this.onOpenTagBody();
        } else if (isOpenTagEnd) {
            this.onOpenTagEnd();
        } else if (isAttribute) {
            this.onAttribute();
        }
    }


    private onOpenTagStart(): void {
        const state = this.state;

        if (state.currentChar === '!') {                              // <!
            state.setOpenTagGroup(false, false, false, false);
            state.setCommentGroup(true, true, false, false);
        } else if (state.currentChar === '/') {                       // </
            state.setOpenTagGroup(false, false, false, false);
            state.setCloseTagGroup(true, false, true, false);
        } else {
            state.setOpenTagGroup(true, false, true, false);
            state.nodeName += state.currentChar;
        }
    }


    private onOpenTagName(): void {
        const state = this.state;

        if (this.isSpaceChar()) {                    // <{element_name}{space}
            state.createNewNode();
            state.setOpenTagGroup(true, false, false, false);
        } else if (state.currentChar === '>') {                       // <{element_name}>
            state.createNewNode();
            state.setOpenTagGroup(false, false, false, false);
            if (state.previousText.lastChar === '/') {                // <{element_name}/>
                state.switchToParentNode();
            } else if (state.previousText.lastChar === '?') {         // <{element_name}?>
                state.switchToParentNode();
            }
        } else {
            state.nodeName += state.currentChar;
        }
    }


    private onOpenTagBody(): void {
        const state = this.state;

        if (!this.isSpaceChar()) {
            if (state.currentChar === '>') {
                state.createNewNode();
                state.setOpenTagGroup(false, false, false, false);
                if (state.previousText.lastChar === '/') {            // <{element_name}{tag_body}/>
                    state.switchToParentNode();
                    state.setOpenTagGroup(false, false, false, false);
                    state.setAttributeNameGroup(false, false, false);
                    state.setAttributeValueGroup(false, false, false);
                }
            } else if (state.currentChar === '?') {                   // <?xml {attributes...}?>
                state.switchToParentNode();
                state.setOpenTagGroup(true, false, false, true);
                state.setAttributeNameGroup(false, false, false);
                state.setAttributeValueGroup(false, false, false);
            } else {                                            // <{element_name} {attribute_name}
                state.setOpenTagGroup(true, false, false, false);
                state.setAttributeNameGroup(true, true, false);
                state.nodeAttributeName += state.currentChar;
            }
        }
    }


    private onOpenTagEnd(): void {
        let {previousText, currentChar} = this.state;

        if (currentChar === '>' && previousText.lastChar === '?') {
            this.state.setOpenTagGroup(false, false, false, false);
        }
    }


    // Attribute context


    private onAttribute(): void {
        let {
            isAttributeName, isAttributeNameStart, isAttributeNameEnd,
            isAttributeValue, isAttributeValueStart
        } = this.state;

        if (isAttributeName) {
            if (isAttributeNameStart) {
                this.onAttributeNameStart();
            } else if (isAttributeNameEnd) {
                this.onAttributeNameEnd();
            }
        } else if (isAttributeValue) {
            if (isAttributeValueStart) {
                this.onAttributeValueStart();
            }
        }
    }


    private onAttributeNameStart(): void {
        if (this.isAcceptableAttributeNameChar()) {
            this.state.nodeAttributeName += this.state.currentChar;
        } else {
            // ... {attribute_name}=
            this.state.setAttributeNameGroup(true, false, true);
        }
    }


    private onAttributeNameEnd(): void {
        const state = this.state;

        if (state.currentChar === `"`) {
            // ... {attribute_name}="
            state.nodeAttributeQuot = state.currentChar;
            state.setAttributeNameGroup(false, false, false);
            state.setAttributeValueGroup(true, true, false);
        }
    }


    private onAttributeValueStart(): void {
        const state = this.state;

        if (this.isAttributeValueEndChar()) {
            // ... {attribute_name}="{attribute_value}"
            state.createNodeAttribute();
            state.setAttributeValueGroup(false, false, false);
            state.setAttributeNameGroup(false, false, false);
        } else {
            state.nodeAttributeValue += state.currentChar;
        }
    }


    // Close tag context


    private onCloseTagName(): void {
        const state = this.state;

        if (state.currentChar === '>') {
            state.switchToParentNode();
            state.setCloseTagGroup(false, false, false, false);
        } else {
            state.nodeName += state.currentChar;
        }
    }


    private onCloseTag(): void {
        const state = this.state;

        if (state.isCloseTagName) {
            this.onCloseTagName();
        }
    }


    // Comment context


    private onComment(): void {
        let {isCommentStart, isCommentText, isCommentEnd} = this.state;

        if (isCommentStart) {                                       // <!
            this.onCommentStart();
        } else if (isCommentText) {
            this.onCommentText();
        } else if (isCommentEnd) {                                  // --
            this.onCommentEnd();
        }
    }


    private onCommentStart(): void {
        let {previousText, currentChar} = this.state;

        if (currentChar === '-') {
            if (previousText.lastChar === '-') {                // <!--
                this.state.setCommentGroup(true, false, true, false);
            }
        } else if (currentChar === '[') {                       // <![
            this.state.setCommentGroup(false, false, false, false);
            this.state.setCDataGroup(true, true, false, false);
        }
    }


    private onCommentText(): void {
        let {previousText, currentChar} = this.state;

        if (currentChar === '-') {
            if (previousText.lastChar === '-') {                // --
                this.state.setCommentGroup(true, false, false, true);
            } else {
                this.state.commentTextContent += currentChar;
            }
        } else {
            this.state.commentTextContent += currentChar;
        }
    }


    private onCommentEnd(): void {
        const state = this.state;

        if (state.currentChar === '>') {                              // -->
            state.createCommentNode();
            state.setCommentGroup(false, false, false, false);
        }
    }


    // CData context


    private onCData(): void {
        const state = this.state;
        let {isCDataStart, isCDataText, isCDataEnd} = state;

        if (isCDataStart) {                                         // <![
            this.onCDataStart();
        } else if (isCDataText) {
            this.onCDataText();
        } else if (isCDataEnd) {                                    // ]]
            this.onCDataEnd();
        }
    }


    private onCDataStart(): void {
        const state = this.state;

        if (state.currentChar === '[') {
            if (state.previousText.endsWith('<![CDATA')) {          // <![CDATA[
                state.setCDataGroup(true, false, true, true);
            }
        }
    }


    private onCDataText(): void {
        const state = this.state;

        if (state.currentChar === ']') {
            if (state.previousText.lastChar === ']') {                // ]]
                state.setCDataGroup(true, false, false, true);
            } else {
                state.charDataContent += state.currentChar;
            }
        } else {
            state.charDataContent += state.currentChar;
        }
    }


    private onCDataEnd(): void {
        const state = this.state;

        if (state.currentChar === '>') {                              // ]]>
            state.createCDataNode();
            state.setCDataGroup(false, false, false, false);
        }
    }


    // Text content context


    private onTextContent(): void {
        const state = this.state;

        if (state.currentChar === '<') {
            state.createTextNode();
            state.setOpenTagGroup(true, true, false, false);
        } else {
            state.nodeTextContent += state.currentChar;
        }
    }


    // Tokens detectors


    private isSpaceChar(): boolean {
        const state = this.state;

        return /^\s+$/i.test(state.currentChar);
    }


    private isAcceptableAttributeNameChar(): boolean {
        const state = this.state;

        return !(this.isSpaceChar() || state.currentChar === '=' || state.currentChar === '>');
    }


    private isAttributeValueEndChar(): boolean {
        const state = this.state;
        let {nodeAttributeQuot, previousText, currentChar} = state;

        return currentChar === nodeAttributeQuot && previousText.lastChar !== '\\';
    }
}

