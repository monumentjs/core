

export interface PropertyValidationRule<T> {
    validate(value: T): void;
}
