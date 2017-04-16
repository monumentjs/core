import DebouncedMethod from '../../../../../../src/Core/Language/Decorators/helpers/DebouncedMethod';


describe('DebouncedMethod', () => {
    const TEST_ARGUMENTS = [1, 2, 3];

    let method: DebouncedMethod;


    // beforeAll(() => {
    //     jest.useFakeTimers();
    // });
    //
    // afterAll(() => {
    //     jest.useRealTimers();
    // });


    describe('#constructor(method, delay[, leading, trailing, maxWait])', () => {
        it('create new instance with only 2 arguments specified', () => {
            let fn = jest.fn();

            expect(() => {
                method = new DebouncedMethod(fn, 100);
            }).not.toThrow();
        });
    });


    describe('#call(context, args)', () => {
        it('schedule a call of method', () => {
            return new Promise((resolve, reject) => {
                let fn = jest.fn(function () {
                    setTimeout(() => {
                        try {
                            expect(this).toEqual(null);
                            expect(fn).toHaveBeenCalledWith(...TEST_ARGUMENTS);
                            expect(fn).toHaveBeenCalledTimes(1);
                            expect(method.isPending).toEqual(false);
                            resolve();
                        } catch (ex) {
                            reject(ex);
                        }
                    });
                });

                method = new DebouncedMethod(fn, 100);
                method.call(null, TEST_ARGUMENTS);

                expect(fn).toHaveBeenCalledTimes(0);
                expect(method.isPending).toEqual(true);
            });
        });


        describe('suppress too rapidly method calls', () => {
            it('trailing', () => {
                return new Promise((resolve, reject) => {
                    let fn = jest.fn(function () {
                        setTimeout(() => {
                            try {
                                expect(this).toEqual([]);
                                expect(fn).toHaveBeenCalledWith(...TEST_ARGUMENTS);
                                expect(fn).toHaveBeenCalledTimes(1);
                                expect(method.isPending).toEqual(false);
                                resolve();
                            } catch (ex) {
                                reject(ex);
                            }
                        });
                    });

                    method = new DebouncedMethod(fn, 100);
                    method.call(null, TEST_ARGUMENTS);
                    method.call({}, TEST_ARGUMENTS);
                    method.call([], TEST_ARGUMENTS);

                    expect(fn).toHaveBeenCalledTimes(0);
                    expect(method.isPending).toEqual(true);
                });
            });


            it('leading', () => {
                return new Promise((resolve, reject) => {
                    let fn = jest.fn(function () {
                        setTimeout(() => {
                            try {
                                expect(this).toEqual(null);
                                expect(fn).toHaveBeenCalledWith(...TEST_ARGUMENTS);
                                expect(fn).toHaveBeenCalledTimes(1);

                                // Should still be pending after the leading call.

                                expect(method.isPending).toEqual(true);

                                // After delay it's status should change to NOT pending.

                                setTimeout(() => {
                                    try {
                                        expect(method.isPending).toEqual(false);
                                        resolve();
                                    } catch (ex) {
                                        reject(ex);
                                    }
                                }, 200);
                            } catch (ex) {
                                reject(ex);
                            }
                        });
                    });

                    method = new DebouncedMethod(fn, 100, true, false);
                    method.call(null, TEST_ARGUMENTS);
                    method.call({}, TEST_ARGUMENTS);
                    method.call([], TEST_ARGUMENTS);

                    expect(fn).toHaveBeenCalledTimes(1);
                    expect(method.isPending).toEqual(true);
                });
            });


            it('leading and trailing', () => {
                return new Promise((resolve, reject) => {
                    let leadingCall: boolean = true;
                    let fn = jest.fn(function () {
                        if (leadingCall) {
                            expect(this).toEqual(null);
                            expect(fn).toHaveBeenCalledWith(...TEST_ARGUMENTS);
                            expect(fn).toHaveBeenCalledTimes(1);
                            expect(method.isPending).toEqual(true);
                            leadingCall = false;
                            return;
                        }

                        setTimeout(() => {
                            try {
                                expect(this).toEqual([]);
                                expect(fn).toHaveBeenCalledWith(...TEST_ARGUMENTS);
                                expect(fn).toHaveBeenCalledTimes(2);

                                // Should still be pending after the call.
                                expect(method.isPending).toEqual(false);

                                resolve();
                            } catch (ex) {
                                reject(ex);
                            }
                        });
                    });

                    method = new DebouncedMethod(fn, 100, true, true);
                    method.call(null, TEST_ARGUMENTS);
                    method.call({}, TEST_ARGUMENTS);
                    method.call([], TEST_ARGUMENTS);

                    expect(fn).toHaveBeenCalledTimes(1);
                    expect(fn).toHaveBeenCalledWith(...TEST_ARGUMENTS);
                    expect(method.isPending).toEqual(true);
                });
            });
        });


        describe.skip('force call after max wait time exceeded', () => {
            it('trailing', () => {
                return new Promise((resolve, reject) => {
                    let fn = jest.fn();

                    method = new DebouncedMethod(fn, 100, false, true, 200);

                    method.call(null, TEST_ARGUMENTS);

                    expect(fn).toHaveBeenCalledTimes(0);
                    expect(method.isPending).toEqual(true);
                });
            });
        });
    });


});