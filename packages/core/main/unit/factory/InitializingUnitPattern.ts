import {ObjectPattern} from '../../language/ObjectPattern';
import {MethodPattern} from '../../language/MethodPattern';
import {InitializingUnit} from './InitializingUnit';


export class InitializingUnitPattern extends ObjectPattern {
    private static _instance: InitializingUnitPattern | undefined;

    public static get(): InitializingUnitPattern {
        if (this._instance == null) {
            this._instance = new InitializingUnitPattern();
        }

        return this._instance;
    }


    private constructor() {
        super([], [
            new MethodPattern(InitializingUnit.afterPropertiesSet)
        ]);
    }
}
