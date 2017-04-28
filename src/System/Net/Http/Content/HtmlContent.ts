import {TextContent} from './TextContent';
import {Utf8Encoding} from '../../../Text/Utf8Encoding';
import {Encoding} from '../../../Text/Encoding';


export class HtmlContent extends TextContent {
    public constructor(content: string, encoding: Encoding = Utf8Encoding.instance) {
        super(content, encoding);

        this.headers.set('Content-Type', 'text/html');
    }
}
