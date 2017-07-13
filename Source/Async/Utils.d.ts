export declare function wait(timeInMilliseconds: number): Promise<void>;
export declare function callAsyncMethod<T = void>(instance: object, method: string | symbol, ...args: any[]): Promise<T>;
