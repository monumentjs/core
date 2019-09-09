import { Exception } from './Exception';

/**
 * Represents runtime exception.
 * All exceptions thrown at runtime must extend this class.
 * @author Alex Chugaev
 * @since 0.14.0
 */
export abstract class RuntimeException extends Exception {}
