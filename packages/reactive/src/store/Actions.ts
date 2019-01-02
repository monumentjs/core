import {SimpleSubject} from '../base/SimpleSubject';
import {Action} from './Action';

export class Actions<TAction extends Action> extends SimpleSubject<TAction> {
}
