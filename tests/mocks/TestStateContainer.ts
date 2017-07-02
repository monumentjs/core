import {TestAction} from './TestAction';
import {TestState} from './TestState';
import {StateContainer} from '../../src/System/ComponentModel/StateContainer';


export class TestStateContainer extends StateContainer<TestState, TestAction> {
    protected getInitialState(): TestState {
        return new TestState();
    }


    protected processAction(action: TestAction): void {
        switch (action.constructor) {
            case TestAction:
                this.onNextReport(action);
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

