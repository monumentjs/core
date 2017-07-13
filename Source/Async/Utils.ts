import {Assert} from '../Assertion/Assert';


export function wait(timeInMilliseconds: number): Promise<void> {
    Assert.argument('timeInMilliseconds', timeInMilliseconds).notNull();

    return new Promise<void>((resolve: () => void): void => {
        setTimeout(resolve, timeInMilliseconds);
    });
}


export function callAsyncMethod<T = void>(instance: object, method: string|symbol, ...args: any[]): Promise<T> {
    Assert.argument('instance', instance).notNull();
    Assert.argument('method', method).notNull();

    return new Promise<T>((resolve, reject) => {
        instance[method](...args, (error: Error, value: any): void => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
}