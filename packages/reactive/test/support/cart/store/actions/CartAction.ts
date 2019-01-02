import {UpdateQuantityAction} from './UpdateQuantityAction';
import {AddProductAction} from './AddProductAction';
import {AddProductSuccessAction} from './AddProductSuccessAction';

export type CartAction = AddProductAction | AddProductSuccessAction | UpdateQuantityAction;

