import {DeferredObject} from '../../../Source/Async/DeferredObject';


describe(`DeferredObject`, () => {
    let instance: DeferredObject;


    beforeEach(() => {
        instance = new DeferredObject();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of DeferredObject`, () => {
            expect(instance).toBeInstanceOf(DeferredObject);
        });
    });


    describe(`#resolve()`, () => {
        it(`assigns a value to deferred object`, async () => {
            let deferred = new DeferredObject<number>();

            deferred.resolve(123);

            expect(deferred.isPending).toBe(false);
            expect(deferred.isResolved).toBe(true);
            expect(deferred.isRejected).toBe(false);

            await expect(deferred.promise).resolves.toBe(123);
        });
    });
});
