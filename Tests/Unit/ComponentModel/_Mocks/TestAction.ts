import {IStatePatch} from '../../../../Source/ComponentModel/IStatePatch';
import {TestState} from './TestState';


export class TestAction implements IStatePatch<TestState> {
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
