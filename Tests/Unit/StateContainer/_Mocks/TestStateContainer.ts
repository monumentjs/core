import {TestState} from './TestState';
import {StateContainer} from '../../../../Source/StateContainer/StateContainer';


export class TestStateContainer extends StateContainer<TestState> {
    protected getInitialState(): TestState {
        return new TestState();
    }
}

