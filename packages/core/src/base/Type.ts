
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type Type<T> = {
    new(...args: any[]): T;
};
