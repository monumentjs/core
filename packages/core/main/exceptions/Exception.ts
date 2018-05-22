import {JSONSerializable} from '../JSONSerializable';


export class Exception extends Error implements JSONSerializable<Error> {
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


    public toJSON() {
        return {
            message: this.message,
            name: this.name,
            stack: this.stack
        };
    }
}
