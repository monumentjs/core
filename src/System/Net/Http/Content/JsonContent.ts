import {TextContent} from './TextContent';
import {Utf8Encoding} from '../../../Text/Utf8Encoding';
import {Encoding} from '../../../Text/Encoding';


export class JsonContent extends TextContent {
    public constructor(content: object, encoding: Encoding = Utf8Encoding.instance) {
        let jsonContent: string = JSON.stringify(content);

        super(jsonContent, encoding);

        this.headers.set('Content-Type', 'application/json');
    }
}
