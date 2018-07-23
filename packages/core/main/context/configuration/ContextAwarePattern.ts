import {ObjectPattern} from '../../language/ObjectPattern';
import {MethodPattern} from '../../language/MethodPattern';
import {ContextAware} from './ContextAware';


export class ContextAwarePattern extends ObjectPattern {
    private static _instance: ContextAwarePattern | undefined;

    public static get(): ContextAwarePattern {
        if (this._instance == null) {
            this._instance = new ContextAwarePattern();
        }

        return this._instance;
    }


    private constructor() {
        super([], [
            new MethodPattern(ContextAware.setContext),
        ]);
    }
}
