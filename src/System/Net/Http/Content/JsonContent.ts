import {TextContent} from './TextContent';


export class JsonContent extends TextContent {
    public constructor(content: object) {
        let jsonContent: string = JSON.stringify(content);

        super(jsonContent);

        this.headers.set('Content-Type', 'application/json');
    }
}
