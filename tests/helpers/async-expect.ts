import Constructable = jest.Constructable;


export function asyncExpect(factoryMethod: () => Promise<any>) {
    let promise: Promise<any> = factoryMethod();

    return {
        toThrowError(error?: string | Constructable | RegExp): Promise<void> {
            return promise.catch((ex) => {
                expect(() => {
                    throw ex;
                }).toThrowError(error);
            });
        }
    };
}

