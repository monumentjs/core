/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @param T type of target object
 */
export type Type<T extends object = object> = new (...args: Array<any>) => T;
