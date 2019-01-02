import {CartItemDto} from '../../dto/CartItemDto';

export class CartItem implements CartItemDto {
    public readonly itemId: number;
    public readonly productId: number;
    public readonly productName: string;
    public readonly productPrice: number;
    public quantity: number;

    public get totalPrice(): number {
        return this.quantity * this.productPrice;
    }

    public constructor({itemId, productId, productName, productPrice, quantity}: CartItemDto) {
        this.itemId = itemId;
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.quantity = quantity;
    }

}
