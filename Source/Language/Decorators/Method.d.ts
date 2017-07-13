export declare class Method {
    static debounce(timeout: number, leading?: boolean, trailing?: boolean, maxWait?: number): MethodDecorator;
    static deprecated(message?: string): MethodDecorator;
    static attached(): MethodDecorator;
    static profile(): MethodDecorator;
}
