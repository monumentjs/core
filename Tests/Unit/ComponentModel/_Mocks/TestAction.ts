import {IAction} from '../../../../Source/ComponentModel/IAction';
import {TestState} from './TestState';


export class TestAction implements IAction<TestState> {
    public readonly isPassed: boolean;


    public constructor(isPassed: boolean) {
        this.isPassed = isPassed;
    }


    public apply(state: TestState): void {
        if (this.isPassed) {
            state.passedTestsCount++;
        } else {
            state.fallenTestsCount++;
        }

        state.totalTestsCount++;
    }
}
