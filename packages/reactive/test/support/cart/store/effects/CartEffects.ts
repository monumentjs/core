import {Actions, Effects, Observable, Observer, Subject} from '../../../../..';
import {CartAction} from '../actions/CartAction';
import {CartActionType} from '../actions/CartActionType';
import {AddProductAction} from '../actions/AddProductAction';
import {AddProductSuccessAction} from '../actions/AddProductSuccessAction';

export class CartEffects implements Effects<CartAction> {
    public use(actions: Actions<CartAction>): Observable<CartAction> {
        const subject: Subject<CartAction> = new Subject();

        actions.subscribe((action: CartAction) => {
            switch (action.type) {
                case CartActionType.ADD_PRODUCT:
                    this.addProduct(action, subject);
                    break;
                case CartActionType.UPDATE_QUANTITY:
                    break;
            }
        });

        return subject;
    }

    public addProduct(action: AddProductAction, observer: Observer<CartAction>): void {
        setTimeout(() => {
            observer.next(new AddProductSuccessAction(action.item));
        }, 100);
    }
}
