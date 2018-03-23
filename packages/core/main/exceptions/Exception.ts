

export class Exception extends Error {
    public static cast(error: Error): Exception {
        if (error instanceof Exception) {
            return error;
        }

        let ex: Exception = new Exception(error.message);

        ex.stack = error.stack;

        return ex;
    }


    public readonly timestamp: number = Date.now();
    public readonly innerException: Exception | undefined;
    public helpLink?: string;


    public constructor(message: string, innerException?: Exception) {
        super(message);

        this.name = this.constructor.name;
        this.innerException = innerException;
    }


    public toString(): string {
        let error: string = `${this.constructor.name}: ${this.message}\n`;

        if (this.helpLink) {
            error += `See: ${this.helpLink}\n`;
        }

        error += `Stack:\n${this.stack}\n`;

        return error;
    }
}
