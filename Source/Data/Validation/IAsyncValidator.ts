

export interface IAsyncValidator<TValue> {
    isValid: boolean;
    validate(value: TValue): Promise<boolean>;
}
