

export interface IValidator<T> {
    readonly isInvalid: boolean;
    readonly isPristine: boolean;
    readonly isDirty: boolean;
    validate(value: T): boolean;
}
