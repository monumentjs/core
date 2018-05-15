

export class Exception extends Error {
    public static cast(error: Error): Exception {
        if (error instanceof Exception) {
            return error;
        }

        let ex: Exception = new Exception(error.message);

        ex.stack = error.stack;

        return ex;
    }


    public readonly innerException: Exception | undefined;


    public constructor(message: string, innerException?: Exception) {
        super(message);

        this.name = this.constructor.name;
        this.innerException = innerException;
    }


    public toString(): string {
        let error: string = `${this.name}: ${this.message}\n`;

        error += `Stack:\n${this.stack}\n`;

        return error;
    }
}
