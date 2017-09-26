import {StateContainer} from '../../../Source/StateContainer/StateContainer';
import {TestState} from './Mocks/TestState';
import {TestStateContainer} from './Mocks/TestStateContainer';
import {TestAction} from './Mocks/TestAction';
import {IStateReceiver} from '../../../Source/StateContainer/IStateReceiver';


describe(`StateContainer`, () => {
    let container: StateContainer<TestState>;


    beforeEach(() => {
        container = new TestStateContainer();
    });


    describe(`constructor()`, () => {
        it(`creates new instance of StateContainer`, () => {
            expect(container).toBeInstanceOf(StateContainer);
        });
    });


    describe(`commit()`, () => {
        it(`does not throw if 'action' argument is not defined`, () => {
            expect(() => {
                container.commit();
            }).not.toThrow();
        });

        it('updates internal state', () => {
            expect(container.state.passedTestsCount).toBe(0);
            expect(container.state.fallenTestsCount).toBe(0);
            expect(container.state.totalTestsCount).toBe(0);

            container.commit(new TestAction(true));

            expect(container.state.passedTestsCount).toBe(1);
            expect(container.state.fallenTestsCount).toBe(0);
            expect(container.state.totalTestsCount).toBe(1);

            container.commit(new TestAction(false));

            expect(container.state.passedTestsCount).toBe(1);
            expect(container.state.fallenTestsCount).toBe(1);
            expect(container.state.totalTestsCount).toBe(2);
        });

        it(`immediately pushes actual state to added receiver`, () => {
            let receiver: IStateReceiver<TestState> = {
                setState: jest.fn()
            };

            expect(receiver.setState).toHaveBeenCalledTimes(0);

            container.addReceiver(receiver);

            expect(receiver.setState).toHaveBeenCalledTimes(1);
            expect(receiver.setState).toHaveBeenLastCalledWith(container.state);
        });

        it(`pushes actual state to all receivers after each 'dispatch'`, () => {
            let receiver: IStateReceiver<TestState> = {
                setState: jest.fn()
            };

            expect(receiver.setState).toHaveBeenCalledTimes(0);

            container.addReceiver(receiver);
            container.commit(new TestAction(true));

            expect(receiver.setState).toHaveBeenCalledTimes(2);
            expect(receiver.setState).toHaveBeenLastCalledWith(container.state);

            container.commit(new TestAction(false));

            expect(receiver.setState).toHaveBeenCalledTimes(3);
            expect(receiver.setState).toHaveBeenLastCalledWith(container.state);
        });
    });
});
