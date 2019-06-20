/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class Exception extends Error {
  static cast(error: Error): Exception {
    if (error instanceof Exception) {
      return error;
    }

    const ex: Exception = new Exception(error.message);

    ex.stack = error.stack;

    return ex;
  }

  readonly cause: Exception | undefined;

  constructor(message: string, cause?: Error) {
    super(message);

    this.name = this.constructor.name;

    if (cause != null) {
      this.cause = Exception.cast(cause);
    }
  }

  toString(): string {
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
