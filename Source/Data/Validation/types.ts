

export type ValidateFunction<T> = (value: T) => boolean;
export type AsyncValidateFunction<T> = (value: T) => Promise<boolean>;
