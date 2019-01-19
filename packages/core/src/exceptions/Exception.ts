
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Exception extends Error {
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

    public toString(): string {
        let value: string = '';

        if (this.stack != null) {
            value = this.stack;
        } else {
            value = `${this.name} ${this.message}`;
        }

        if (this.cause != null) {
            value += '\r\nCaused by ';
            value += this.cause.toString();
        }

        return value;
    }
}
