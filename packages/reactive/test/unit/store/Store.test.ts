import {Store} from '../../..';
import {CartActions, CartEffects, CartState, CartStore} from '../../support/cart';
import {TestObserver} from '../../support/TestObserver';


describe('Store', function () {
    test('state update', function () {
        const actions: CartActions = new CartActions();
        const effects: CartEffects = new CartEffects();
        const store: CartStore = new CartStore(actions, effects);
        const stateA: CartState = store.value;
        const observer = new TestObserver();

        store.subscribe(observer);

        expect(store.value.items.length).toBe(0);
        expect(store.value.totalPrice).toBe(0);

        actions.addProduct({
            itemId: 1,
            productId: 1,
            productName: 'Product One',
            productPrice: 1.23,
            quantity: 1
        });

        const stateB: CartState = store.value;

        expect(store.value.items.length).toEqual(1);
        expect(store.value.totalPrice).toEqual(1.23);

        actions.updateQuantity(1, 2);

        const stateC: CartState = store.value;

        expect(store.value.items.length).toEqual(1);
        expect(store.value.totalPrice).toEqual(2.46);

        expect(stateA).not.toBe(stateB);
        expect(stateB).not.toBe(stateC);
        expect(stateA).not.toBe(stateC);
    });
});
