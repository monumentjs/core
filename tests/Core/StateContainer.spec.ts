import {StateContainer} from '../../lib/Core/StateContainer';
import TestStateContainer from './implementations/TestStateContainer';
import TestAction from './implementations/TestAction';
import TestState from './implementations/TestState';
import ArgumentNullException from '../../lib/Core/Exceptions/ArgumentNullException';
import {ActionListenerCancel} from '../../lib/Core/Dispatcher';


describe(`StateContainer`, () => {
    let instance: StateContainer<TestState> = null;


    beforeEach(() => {
        expect(() => {
            instance = new TestStateContainer();
        }).not.toThrow();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance`, () => {
            expect(instance).toBeInstanceOf(StateContainer);
        });
    });


    describe(`#state`, () => {
        it(`represents state at the current moment of time`, () => {
            expect(instance.state).toBeInstanceOf(Object);
        });
    });


    describe(`#addWatcher()`, () => {
        it(`throws if watcher is not a function`, () => {
            expect(() => {
                instance.addWatcher(null);
            }).toThrowError(ArgumentNullException);
        });


        it(`adds watcher function to state container and returns cancellation function`, () => {
            let watcher = jest.fn();
            let cancelWatch: ActionListenerCancel = instance.addWatcher(watcher);

            expect(watcher).toHaveBeenCalledTimes(0);
            expect(typeof cancelWatch).toBe('function');

            instance.dispatchAction(new TestAction(true));

            expect(watcher).toHaveBeenCalledTimes(1);
        });


        it(`removes watcher after cancellation function called`, () => {
            let watcher = jest.fn();
            let cancelWatch: ActionListenerCancel = instance.addWatcher(watcher);

            expect(watcher).toHaveBeenCalledTimes(0);
            expect(typeof cancelWatch).toBe('function');

            instance.dispatchAction(new TestAction(true));

            expect(watcher).toHaveBeenCalledTimes(1);

            cancelWatch();

            instance.dispatchAction(new TestAction(true));

            expect(watcher).toHaveBeenCalledTimes(1);
        });
    });


    describe(`#removeWatcher()`, () => {
        it(`throws if watcher is \`null\` or \`undefined\``, () => {
            expect(() => {
                instance.removeWatcher(null);
            }).toThrowError(ArgumentNullException);
        });


        describe(`removes watcher function from state container`, () => {
            it(`returns \`true\` if such watcher was attached to state container`, () => {
                let watcher = jest.fn();
                let isRemoved: boolean = false;

                instance.addWatcher(watcher);

                expect(() => {
                    isRemoved = instance.removeWatcher(watcher);
                }).not.toThrow();

                expect(isRemoved).toBe(true);
            });


            it(`returns \`false\` if such watcher wasn't attached to state container`, () => {
                let watcher = jest.fn();
                let isRemoved: boolean = false;

                expect(() => {
                    isRemoved = instance.removeWatcher(watcher);
                }).not.toThrow();

                expect(isRemoved).toBe(false);
            });
        });
    });


    describe(`#dispatchAction()`, () => {
        it(`throws if action is \`null\` or \`undefined\``, () => {
            expect(() => {
                instance.dispatchAction(null);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                instance.dispatchAction(undefined);
            }).toThrowError(ArgumentNullException);
        });


        it('triggers state mutation and dispatches state to all watchers', () => {
            let watcher = jest.fn();

            instance.addWatcher(watcher);

            instance.dispatchAction(new TestAction(true));
            instance.dispatchAction(new TestAction(false));

            expect(watcher).toHaveBeenCalledTimes(2);

            expect(instance.state.totalTestsCount).toBe(2);
            expect(instance.state.passedTestsCount).toBe(1);
            expect(instance.state.fallenTestsCount).toBe(1);
        });
    });


    describe(`#resetState()`, () => {
        it(`resets state to it's initial value`, () => {
            instance.dispatchAction(new TestAction(true));

            expect(instance.state.totalTestsCount).toBe(1);
            expect(instance.state.passedTestsCount).toBe(1);
            expect(instance.state.fallenTestsCount).toBe(0);

            expect(() => {
                instance.resetState();
            }).not.toThrow();

            expect(instance.state.totalTestsCount).toBe(0);
            expect(instance.state.passedTestsCount).toBe(0);
            expect(instance.state.fallenTestsCount).toBe(0);
        });
    });
});