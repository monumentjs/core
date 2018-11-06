import {ToJSON} from '../base/ToJSON';
import {ToString} from '../base/ToString';
import {StringPool} from '../text/StringPool';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Exception extends Error implements ToJSON<Error>, ToString {
    public static cast(error: Error): Exception {
        if (error instanceof Exception) {
            return error;
        }

        const ex: Exception = new Exception(error.message);

        ex.stack = error.stack;

        return ex;
    }

    public readonly cause: Exception | undefined;

    public constructor(message: string, cause?: Error) {
        super(message);

        this.name = this.constructor.name;

        if (cause != null) {
            this.cause = Exception.cast(cause);
        }
    }

    public toJSON() {
        return {
            message: this.message,
            name: this.name,
            stack: this.stack,
            cause: this.cause
        };
    }

    public toString(): string {
        let value: string = '';

        if (this.stack != null) {
            value = this.stack;
        } else {
            value = `${this.name} ${this.message}`;
        }

        if (this.cause != null) {
            value += StringPool.EOL_CRLF + 'Caused by ';
            value += this.cause.toString();
        }

        return value;
    }
}
