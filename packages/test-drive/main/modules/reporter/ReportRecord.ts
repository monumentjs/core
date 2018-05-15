import {Exception} from '@monument/core/main/exceptions/Exception';


export class ReportRecord {
    // TODO: public readonly filePath: string;
    public readonly className: string;
    public readonly methodName: string;
    public readonly exception?: Exception;

    public constructor(className: string, methodName: string, exception?: Exception) {
        this.className = className;
        this.methodName = methodName;
        this.exception = exception;
    }
}
