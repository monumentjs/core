
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type GetterFunction<T = any> = () => T;

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type SetterFunction<T = any> = (value: T) => void;
