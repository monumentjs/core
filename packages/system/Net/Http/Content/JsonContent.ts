import {TextContent} from './TextContent';
import {MediaType} from '@monument/system/Net/Http/Mime/MediaType';


export class JsonContent extends TextContent {
    public readonly value: object;


    public constructor(value: object) {
        super(JSON.stringify(value));

        this.value = value;
        this.headers.contentType = MediaType.parseMediaType('application/json');
    }
}
