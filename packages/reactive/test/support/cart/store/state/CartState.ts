import { ImmutableArrayList, ImmutableList } from '@monument/core';
import { CartItem } from './CartItem';

export class CartState {
    public readonly items: ImmutableList<CartItem>;

    public get totalPrice(): number {
        if (this.items.isEmpty) {
            return 0;
        }

        return this.items.sum(
            (item: CartItem): number => {
                return item.totalPrice;
            }
        );
    }

    public constructor(items: ImmutableList<CartItem> = new ImmutableArrayList()) {
        this.items = items;
    }

    public addProduct(newItem: CartItem): CartState {
        const existingItem: CartItem | undefined = this.items.first(item => {
            return item.productId === newItem.productId;
        });

        if (existingItem) {
            return new CartState(
                new ImmutableArrayList(
                    this.items.map(item => {
                        if (item.productId === newItem.productId) {
                            return new CartItem({
                                ...item,
                                quantity: item.quantity + newItem.quantity
                            });
                        }

                        return item;
                    })
                )
            );
        } else {
            return new CartState(this.items.add(newItem));
        }
    }

    public updateQuantity(itemId: number, newQuantity: number): CartState {
        return new CartState(
            new ImmutableArrayList(
                this.items.map(item => {
                    if (item.itemId === itemId) {
                        return new CartItem({
                            ...item,
                            quantity: newQuantity
                        });
                    }

                    return item;
                })
            )
        );
    }
}
