import {assertArgumentNotNull} from '../../Assertion/Assert';
import InvalidArgumentException from '../../Core/Exceptions/InvalidArgumentException';


export default class Viewport {
    private _left: number = 0;
    private _top: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    private _scrollLeft: number = 0;
    private _scrollTop: number = 0;
    private _scrollWidth: number = 0;
    private _scrollHeight: number = 0;

    private _verticalScrollBarWidth: number = 0;
    private _horizontalScrollBarWidth: number = 0;


    public get left(): number {
        return this._left;
    }


    public get top(): number {
        return this._top;
    }


    public get right(): number {
        return this._left + this._width;
    }


    public get bottom(): number {
        return this._top + this._height;
    }


    public get width(): number {
        return this._width;
    }


    public get height(): number {
        return this._height;
    }


    public get scrollLeft(): number {
        return this._scrollLeft;
    }


    public get scrollTop(): number {
        return this._scrollTop;
    }


    public get scrollWidth(): number {
        return this._scrollWidth;
    }


    public get scrollHeight(): number {
        return this._scrollHeight;
    }


    public get horizontalScrollBarWidth(): number {
        return this._horizontalScrollBarWidth;
    }


    public set horizontalScrollBarWidth(value: number) {
        assertArgumentNotNull('value', value);

        if (value < 0) {
            throw new InvalidArgumentException(`Width cannot be less than zero.`);
        }

        this._horizontalScrollBarWidth = value;
    }


    public get verticalScrollBarWidth(): number {
        return this._verticalScrollBarWidth;
    }


    public set verticalScrollBarWidth(value: number) {
        assertArgumentNotNull('value', value);

        if (value < 0) {
            throw new InvalidArgumentException(`Width cannot be less than zero.`);
        }

        this._verticalScrollBarWidth = value;
    }


    public get clientWidth(): number {
        if (this._scrollWidth > this._width) {
            return this._width - this._verticalScrollBarWidth;
        } else {
            return this._width;
        }
    }


    public get clientHeight(): number {
        if (this._scrollHeight > this._height) {
            return this._height - this._horizontalScrollBarWidth;
        } else {
            return this._height;
        }
    }


    public get isOverflowX(): boolean {
        return this._scrollWidth > this._width;
    }


    public get isOverflowY(): boolean {
        return this._scrollHeight > this._height;
    }


    public get isAtTop(): boolean {
        return this._scrollTop === 0;
    }


    public get isAtLeft(): boolean {
        return this._scrollLeft === 0;
    }


    public get isAtRight(): boolean {
        return this._scrollWidth - this._width === this._scrollWidth;
    }


    public get isAtBottom(): boolean {
        return this._scrollHeight - this._height === this._scrollTop;
    }


    public moveTo(left: number, top: number): void {
        assertArgumentNotNull('left', left);
        assertArgumentNotNull('top', top);

        this._left = left;
        this._top = top;

        this.normalizeBounds();
    }


    public moveBy(leftOffset: number, topOffset: number): void {
        assertArgumentNotNull('leftOffset', leftOffset);
        assertArgumentNotNull('topOffset', topOffset);

        this._left += leftOffset;
        this._top += topOffset;

        this.normalizeBounds();
    }


    public resizeTo(width: number, height: number): void {
        assertArgumentNotNull('width', width);
        assertArgumentNotNull('height', height);

        this._width = width;
        this._height = height;

        this.normalizeBounds();
    }


    public resizeBy(widthDelta: number, heightDelta: number): void {
        assertArgumentNotNull('widthDelta', widthDelta);
        assertArgumentNotNull('heightDelta', heightDelta);

        this._width += widthDelta;
        this._height += heightDelta;

        this.normalizeBounds();
    }


    public scrollTo(scrollLeft: number, scrollTop: number): void {
        assertArgumentNotNull('scrollLeft', scrollLeft);
        assertArgumentNotNull('scrollTop', scrollTop);

        this._scrollLeft = scrollLeft;
        this._scrollTop = scrollTop;

        this.normalizeBounds();
    }


    public scrollBy(scrollLeftDelta: number, scrollTopDelta: number): void {
        assertArgumentNotNull('scrollLeftDelta', scrollLeftDelta);
        assertArgumentNotNull('scrollTopDelta', scrollTopDelta);

        this._scrollLeft += scrollLeftDelta;
        this._scrollTop += scrollTopDelta;

        this.normalizeBounds();
    }


    private normalizeBounds(): void {
        if (this._scrollLeft < 0) {
            this._scrollLeft = 0;
        }

        if (this._scrollTop < 0) {
            this._scrollTop = 0;
        }

        if (this._scrollWidth - this._scrollLeft < this._width) {
            this._scrollLeft = this._scrollWidth - this._width;
        }

        if (this._scrollHeight - this._scrollTop < this._height) {
            this._scrollTop = this._scrollHeight - this._height;
        }

        if (this._scrollWidth < this._width) {
            this._scrollWidth = this._width;
        }

        if (this._scrollHeight < this._height) {
            this._scrollHeight = this._height;
        }
    }
}