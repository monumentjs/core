import {JSONSerializable} from '../JSONSerializable';
import {StringPool} from '../StringPool';


export class Exception extends Error implements JSONSerializable<Error> {
    public static cast(error: Error): Exception {
        if (error instanceof Exception) {
            return error;
        }

        const ex: Exception = new Exception(error.message);

        ex.stack = error.stack;

        return ex;
    }


    public readonly innerException: Exception | undefined;


    public constructor(message: string, innerException?: Error) {
        super(message);

        this.name = this.constructor.name;

        if (innerException != null) {
            this.innerException = Exception.cast(innerException);
        }
    }


    public toString(): string {
        let value: string = '';

        if (this.stack != null) {
            value = this.stack;
        } else {
            value = `${this.name} ${this.message}`;
        }

        if (this.innerException != null) {
            value += StringPool.EOL_CRLF + 'Inner exception:' + StringPool.EOL_CRLF;
            value += this.innerException.toString();
        }

        return value;
    }


    public toJSON() {
        return {
            message: this.message,
            name: this.name,
            stack: this.stack,
            innerException: this.innerException
        };
    }
}
