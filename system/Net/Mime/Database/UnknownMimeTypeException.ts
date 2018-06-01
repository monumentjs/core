import {Exception} from '../../../../core/main/exceptions/Exception';


export class UnknownMimeTypeException extends Exception {
    public constructor(mimeType: string) {
        super(`Unknown mime type "${mimeType}".`);
    }
}
