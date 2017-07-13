export declare class StringBuilder {
    private _value;
    private _capacity;
    private _linesSeparator;
    linesSeparator: string;
    readonly length: number;
    readonly capacity: number;
    constructor(initialValue?: string, capacity?: number);
    append(text: string): void;
    prepend(text: string): void;
    appendTimes(text: string, times: number): void;
    prependTimes(text: string, times: number): void;
    appendLine(text: string): void;
    prependLine(text: string): void;
    appendObject(obj: object): void;
    prependObject(obj: object): void;
    transform(transformationFn: (input: string) => string): void;
    appendFormat(format: string, ...values: any[]): void;
    prependFormat(format: string, ...values: any[]): void;
    surround(before?: string, after?: string): void;
    clear(): void;
    toString(): string;
    private normalizeValueLength();
}
