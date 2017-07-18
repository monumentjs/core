import {StateContainer} from '../../../Source/ComponentModel/StateContainer';
import {TestState} from './_Mocks/TestState';
import {TestStateContainer} from './_Mocks/TestStateContainer';
import {TestAction} from './_Mocks/TestAction';
import {IStateReceiver} from '../../../Source/ComponentModel/IStateReceiver';


describe(`StateContainer`, () => {
    let container: StateContainer<TestState>;


    beforeEach(() => {
        container = new TestStateContainer();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of StateContainer`, () => {
            expect(container).toBeInstanceOf(StateContainer);
        });
    });


    describe(`#dispatch()`, () => {
        it(`does not throw if 'action' argument is not defined`, () => {
            expect(() => {
                container.dispatch();
            }).not.toThrow();

            expect(() => {
                container.dispatch(null);
            }).not.toThrow();
        });

        it('updates internal state', () => {
            expect(container.state.passedTestsCount).toBe(0);
            expect(container.state.fallenTestsCount).toBe(0);
            expect(container.state.totalTestsCount).toBe(0);

            container.dispatch(new TestAction(true));

            expect(container.state.passedTestsCount).toBe(1);
            expect(container.state.fallenTestsCount).toBe(0);
            expect(container.state.totalTestsCount).toBe(1);

            container.dispatch(new TestAction(false));

            expect(container.state.passedTestsCount).toBe(1);
            expect(container.state.fallenTestsCount).toBe(1);
            expect(container.state.totalTestsCount).toBe(2);
        });

        it(`immediately pushes actual state to added receiver`, () => {
            let receiver: IStateReceiver<TestState> = {
                receiveState: jest.fn()
            };

            expect(receiver.receiveState).toHaveBeenCalledTimes(0);

            container.addReceiver(receiver);

            expect(receiver.receiveState).toHaveBeenCalledTimes(1);
            expect(receiver.receiveState).toHaveBeenLastCalledWith(container.state);
        });

        it(`pushes actual state to all receivers after each 'dispatch'`, () => {
            let receiver: IStateReceiver<TestState> = {
                receiveState: jest.fn()
            };

            expect(receiver.receiveState).toHaveBeenCalledTimes(0);

            container.addReceiver(receiver);
            container.dispatch(new TestAction(true));

            expect(receiver.receiveState).toHaveBeenCalledTimes(2);
            expect(receiver.receiveState).toHaveBeenLastCalledWith(container.state);

            container.dispatch(new TestAction(false));

            expect(receiver.receiveState).toHaveBeenCalledTimes(3);
            expect(receiver.receiveState).toHaveBeenLastCalledWith(container.state);
        });
    });
});
