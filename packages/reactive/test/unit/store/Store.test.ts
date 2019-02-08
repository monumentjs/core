import { Store } from '../../..';
import { AddProductAction, AddProductSuccessAction, CartActions, CartEffect, CartState, CartStore } from '../../support/cart';
import { TestObserver } from '../../support/TestObserver';

describe('Store', function() {
    test('state update', function() {
        const cartActions: CartActions = new CartActions();
        const cartEffect: CartEffect = new CartEffect();
        const cartStore: CartStore = new CartStore(cartActions, cartEffect);
        const stateA: CartState = cartStore.value;
        const cartObserver = new TestObserver();
        const actionsObserver = new TestObserver();

        cartActions.subscribe(actionsObserver);
        cartStore.subscribe(cartObserver);

        expect(cartStore.value.items.length).toBe(0);
        expect(cartStore.value.totalPrice).toBe(0);

        cartActions.addProduct({
            itemId: 1,
            productId: 1,
            productName: 'Product One',
            productPrice: 1.23,
            quantity: 1
        });

        const stateB: CartState = cartStore.value;

        expect(cartStore.value.items.length).toEqual(1);
        expect(cartStore.value.totalPrice).toEqual(1.23);
        expect(actionsObserver.next.mock.calls[0][0]).toBeInstanceOf(AddProductSuccessAction);
        expect(actionsObserver.next.mock.calls[1][0]).toBeInstanceOf(AddProductAction);

        cartActions.updateQuantity(1, 2);

        const stateC: CartState = cartStore.value;

        expect(cartStore.value.items.length).toEqual(1);
        expect(cartStore.value.totalPrice).toEqual(2.46);

        expect(stateA).not.toBe(stateB);
        expect(stateB).not.toBe(stateC);
        expect(stateA).not.toBe(stateC);
    });
});
