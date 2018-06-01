import {Exception} from '../../../../core/main/exceptions/Exception';


export class UnknownHeaderNameException extends Exception {
    public constructor(headerName: string) {
        super(`Header "${headerName}" is unknown.`);
    }
}
