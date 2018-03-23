

export interface Value<T> {
    get(): T;
    set(value: T): void;
}
