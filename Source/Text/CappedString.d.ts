export declare class CappedString {
    private _value;
    private _length;
    readonly value: string;
    readonly firstChar: string;
    readonly lastChar: string;
    constructor(length: number, initialValue?: string);
    append(text: string): void;
    prepend(text: string): void;
    clear(): void;
    contains(substring: string): boolean;
    startsWith(substring: string): boolean;
    endsWith(substring: string): boolean;
    toString(): string;
    private cutText(newValue);
}
