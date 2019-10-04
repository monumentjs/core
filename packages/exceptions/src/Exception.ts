/**
 * Represents basic type of exception.
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class Exception extends Error {
  /**
   * Gets other error which was the cause of this exception.
   * @author Alex Chugaev
   * @since 0.14.0
   */
  readonly cause: Error | undefined;

  /**
   * Initializes new instance.
   * @param message Exception message
   * @param cause Other error which was the cause of this exception
   * @author Alex Chugaev
   * @since 0.14.0
   */
  constructor(message: string, cause?: Error) {
    super(message);

    this.name = this.constructor.name;
    this.cause = cause;
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

      if (this.cause instanceof Exception) {
        value += this.cause.toString();
      } else {
        value += this.cause.stack;
      }
    }

    return value;
  }
}
