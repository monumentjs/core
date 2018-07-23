import {Context} from '../Context';


export interface ContextAware {
    /**
     * Invoked by a UnitFactory after it has set all bean properties supplied
     * (and satisfied UnitFactoryAware and ContextAware).
     * @param {Context} context
     */
    [ContextAware.setContext](context: Context): void;
}

export namespace ContextAware {
    export const setContext = Symbol();
}
