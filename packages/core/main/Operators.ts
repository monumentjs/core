import {Disposable} from './Disposable';


export function using<T extends Disposable>(o: T, closure: (o: T) => Promise<void> | void) {
    const result = closure(o);

    if (result instanceof Promise) {
        return result.finally(() => {
            return o.dispose();
        });
    }

    return undefined;
}
