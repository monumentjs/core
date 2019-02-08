import { Subject } from '../base/Subject';
import { Action } from './Action';

export class Actions<TAction extends Action> extends Subject<TAction> {
    public constructor() {
        super();
    }
}
