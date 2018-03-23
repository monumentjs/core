import {Exception} from '../../core/main/exceptions/Exception';


export class UnknownEncodingException extends Exception {
    public readonly encodingName: string;


    public constructor(encodingName: string, message: string) {
        super(message);

        this.encodingName = encodingName;
    }
}
