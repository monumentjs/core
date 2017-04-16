import TestAction from './TestAction';
import TestState from './TestState';
import {StateContainer} from '../../src/Core/Application/StateContainer';


export default class TestStateContainer extends StateContainer<TestState> {
    protected getInitialState(): TestState {
        return new TestState();
    }


    protected mutateState(action: object): void {
        switch (action.constructor) {
            case TestAction:
                this.onNextReport(action as TestAction);
        }
    }


    protected onNextReport(action: TestAction): void {
        if (action.isPassed) {
            this.state.passedTestsCount++;
        } else {
            this.state.fallenTestsCount++;
        }

        this.state.totalTestsCount++;
    }
}

