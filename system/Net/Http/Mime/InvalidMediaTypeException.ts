import {Exception} from '../../../../core/main/exceptions/Exception';


export class InvalidMediaTypeException extends Exception {
    public readonly mediaType: string;


    public constructor(mediaType: string, message: string) {
        super(`Invalid media type "${mediaType}": ${message}`);

        this.mediaType = mediaType;
    }
}
