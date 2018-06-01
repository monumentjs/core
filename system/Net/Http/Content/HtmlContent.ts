import {TextContent} from './TextContent';
import {MediaType} from '../Mime/MediaType';


export class HtmlContent extends TextContent {
    public constructor(content: string) {
        super(content);

        this.headers.contentType = MediaType.parseMediaType('text/html');
    }
}
