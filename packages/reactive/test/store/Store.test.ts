/* tslint:disable:max-classes-per-file */
import {ImmutableArrayList, ImmutableList} from '@monument/core';
import {Action, Store} from '../..';

interface CartItemDto {
    readonly itemId: number;
    readonly productId: number;
    readonly productName: string;
    readonly productPrice: number;
    readonly quantity: number;
}

class CartItem implements CartItemDto {
    public readonly itemId: number;
    public readonly productId: number;
    public readonly productName: string;
    public readonly productPrice: number;
    public readonly quantity: number;

    public constructor({itemId, productId, productName, productPrice, quantity}: CartItemDto) {
        this.itemId = itemId;
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.quantity = quantity;
    }

    public withQuantity(quantity: number): CartItem {
        if (this.quantity === quantity) {
            return this;
        }

        return new CartItem({
            ...this,
            quantity
        });
    }
}

class CartState {
    public readonly items: ImmutableList<CartItem>;

    public get totalPrice(): number {
        if (this.items.isEmpty) {
            return 0;
        }

        return this.items.sum((item: CartItem): number => {
            return item.productPrice * item.quantity;
        });
    }

    public constructor(items: ImmutableList<CartItem> = new ImmutableArrayList()) {
        this.items = items;
    }
}

enum CartActionType {
    ADD_PRODUCT = 'ADD_PRODUCT',
    UPDATE_QUANTITY = 'UPDATE_QUANTITY'
}

class AddProductAction implements Action {
    public readonly type = CartActionType.ADD_PRODUCT;
    public readonly item: CartItem;

    public constructor(item: CartItem) {
        this.item = item;
    }
}

class UpdateQuantityAction implements Action {
    public readonly type = CartActionType.UPDATE_QUANTITY;
    public readonly itemId: number;
    public readonly quantity: number;

    public constructor(itemId: number, quantity: number) {
        this.itemId = itemId;
        this.quantity = quantity;
    }
}

type CartActionTypes = AddProductAction | UpdateQuantityAction;

class CartStore extends Store<CartState, CartActionTypes> {
    public constructor() {
        super(new CartState());
    }

    protected reduce(action: CartActionTypes): CartState {
        const {items} = this.state;

        switch (action.type) {
            case CartActionType.UPDATE_QUANTITY:
                return new CartState(new ImmutableArrayList(items.map((item: CartItem): CartItem => {
                    if (action.itemId === item.itemId) {
                        return item.withQuantity(action.quantity);
                    }

                    return item;
                })));

            case CartActionType.ADD_PRODUCT:
                return new CartState(items.add(action.item));
        }
    }
}

describe('Store', function () {
    test('state update', function () {
        const store: CartStore = new CartStore();
        const stateA = store.state;
        const onNext = jest.fn();

        store.subscribe({onNext});

        expect(store.state.items.length).toBe(0);
        expect(store.state.totalPrice).toBe(0);

        store.dispatch(new AddProductAction(new CartItem({
            itemId: 1,
            productId: 1,
            quantity: 1,
            productPrice: 1.23,
            productName: 'Product One'
        })));

        const stateB = store.state;

        expect(store.state.items.length).toBe(1);
        expect(store.state.totalPrice).toBe(1.23);

        store.dispatch(new UpdateQuantityAction(1, 2));

        const stateC = store.state;

        expect(store.state.items.length).toBe(1);
        expect(store.state.totalPrice).toBe(2.46);

        expect(stateA).not.toBe(stateB);
        expect(stateB).not.toBe(stateC);
        expect(stateA).not.toBe(stateC);
    });
});
