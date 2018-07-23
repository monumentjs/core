import {ObjectPattern} from '../../../language/ObjectPattern';
import {MethodPattern} from '../../../language/MethodPattern';
import {UnitFactoryPostProcessor} from './UnitFactoryPostProcessor';


export class UnitFactoryPostProcessorPattern extends ObjectPattern {
    private static _instance: UnitFactoryPostProcessorPattern | undefined;

    public static get(): UnitFactoryPostProcessorPattern {
        if (this._instance == null) {
            this._instance = new UnitFactoryPostProcessorPattern();
        }

        return this._instance;
    }


    private constructor() {
        super([], [
            new MethodPattern(UnitFactoryPostProcessor.postProcessUnitFactory)
        ]);
    }
}
