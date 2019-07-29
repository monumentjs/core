import { ChangeEvent, ChangeKind, ObjectChangeDetectionProxy } from '../../..';

class CartState {
  updatedAt: number = 0;

  items: CartItem[] = [];

  get totalPrice(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  addProduct(product: Product, quantity: number) {
    this.items.push({
      product,
      quantity
    });
  }
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Product {
  name: string;
  price: number;
}

describe('ObjectChangeDetectionProxy', function() {
  let source: CartState;
  let changeDetectionProxy: ObjectChangeDetectionProxy<CartState>;
  let proxy: CartState;

  beforeEach(() => {
    source = new CartState();
    source.addProduct({
      name: 'Product#1',
      price: 1
    }, 1);
    changeDetectionProxy = new ObjectChangeDetectionProxy(source);
    proxy = changeDetectionProxy.proxy;
  });

  describe('changed', function() {
    it('should emit ChangeEvent on first-level property change', function(done) {
      changeDetectionProxy.changed.subscribe(event => {
        expect(event.kind).toBe(ChangeKind.SET);
        expect(event.path).toEqual(['updatedAt']);
        expect(source.updatedAt).toBe(1);
        done();
      });

      proxy.updatedAt = 1;
    });

    it('should emit ChangeEvent on third-level property change', function(done) {
      changeDetectionProxy.changed.subscribe(event => {
        expect(event.kind).toBe(ChangeKind.SET);
        expect(event.path).toEqual(['items', '0', 'quantity']);
        expect(source.items[0].quantity).toBe(10);
        done();
      });

      proxy.items[0].quantity = 10;
    });

    it('should emit ChangeEvent on second-level method call', function(done) {
      const events: ChangeEvent[] = [];

      changeDetectionProxy.changed.subscribe(event => {
        events.push(event);
      }, done, () => {
        expect(events.length).toBe(4);
        expect(source.items.length).toBe(2);
        expect(events[0].kind).toBe(ChangeKind.SET);
        expect(events[0].path).toEqual(['items', '1']);
        expect(events[1].kind).toBe(ChangeKind.SET);
        expect(events[1].path).toEqual(['items', 'length']);
        expect(events[2].kind).toBe(ChangeKind.CALL);
        expect(events[2].path).toEqual(['items', 'push']);
        expect(events[3].kind).toBe(ChangeKind.CALL);
        expect(events[3].path).toEqual(['addProduct']);
        done();
      });

      proxy.addProduct({
        name: 'Product#2',
        price: 1
      }, 1);
      changeDetectionProxy.dispose();
    });
  });
});
