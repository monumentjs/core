

export interface Subscriber<T> {
    update(value: T): void;
}
