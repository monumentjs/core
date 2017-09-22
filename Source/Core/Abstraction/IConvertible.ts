

export interface IConvertible<TFrom, TTo> {
    /**
     * Converts given value into another type.
     */
    convert(obj: TFrom): TTo;
}
