import {TestState} from './TestState';
import {StateContainer} from '../../../../Source/ComponentModel/StateContainer';


export class TestStateContainer extends StateContainer<TestState> {
    protected getInitialState(): TestState {
        return new TestState();
    }
}

