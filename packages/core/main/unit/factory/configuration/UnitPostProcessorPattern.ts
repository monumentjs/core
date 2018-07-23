import {ObjectPattern} from '../../../language/ObjectPattern';
import {MethodPattern} from '../../../language/MethodPattern';
import {UnitPostProcessor} from './UnitPostProcessor';


export class UnitPostProcessorPattern extends ObjectPattern {
    private static _instance: UnitPostProcessorPattern | undefined;

    public static get(): UnitPostProcessorPattern {
        if (this._instance == null) {
            this._instance = new UnitPostProcessorPattern();
        }

        return this._instance;
    }


    private constructor() {
        super([], [
            new MethodPattern(UnitPostProcessor.postProcessBeforeInitialization),
            new MethodPattern(UnitPostProcessor.postProcessAfterInitialization)
        ]);
    }
}
