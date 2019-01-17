import {Effect, Subject} from '../../../../..';
import {CartAction} from '../actions/CartAction';
import {CartActionType} from '../actions/CartActionType';
import {AddProductSuccessAction} from '../actions/AddProductSuccessAction';

export class CartEffect implements Effect<CartAction> {

    public onAction(action: CartAction) {
        const subject: Subject<CartAction> = new Subject();

        switch (action.type) {
            case CartActionType.ADD_PRODUCT:
                return [new AddProductSuccessAction(action.item)];
            case CartActionType.UPDATE_QUANTITY:
                break;
        }

        return subject;
    }
}
