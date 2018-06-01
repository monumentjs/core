import {Exception} from '../../../../core/main/exceptions/Exception';


export class InvalidMimeTypeException extends Exception {
    public readonly mimeType: string;


    public constructor(mimeType: string, message: string) {
        super(`Invalid mime type: "${mimeType}": ${message}`);

        this.mimeType = mimeType;
    }
}
