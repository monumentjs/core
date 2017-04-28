import {AsyncResult} from '../../src/Core/types';
import Constructable = jest.Constructable;


export function asyncExpect(factoryMethod: () => AsyncResult<any>) {
    let promise: Promise<any> = factoryMethod();

    return {
        toThrowError(error?: string | Constructable | RegExp): AsyncResult<void> {
            return promise.catch((ex) => {
                expect(() => {
                    throw ex;
                }).toThrowError(error);
            });
        }
    };
}

