import {Context} from '../Context';


export interface ContextAware {
    setContext(context: Context): void;
}
