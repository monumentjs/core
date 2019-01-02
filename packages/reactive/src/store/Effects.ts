import {Action} from './Action';
import {Actions} from './Actions';
import {Observable} from '../base/Observable';

export interface Effects<TAction extends Action> {
    use(actions: Actions<TAction>): Observable<TAction>;
}
