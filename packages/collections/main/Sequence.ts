import {Countable} from './Countable';


export interface Sequence extends Countable {
    readonly isEmpty: boolean;
}
