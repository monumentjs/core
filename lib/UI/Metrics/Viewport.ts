import _defaults = require('lodash/defaults');
import {getScrollBarWidth} from './helpers/ScrollBar';


export const DEFAULT_VIEWPORT = {
    element: null,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0,
    scrollHeight: 0
};


export default class Viewport {
    static fromElement(element: HTMLElement): Viewport {
        let {
            offsetLeft, offsetTop, offsetWidth, offsetHeight,
            scrollLeft, scrollTop, scrollWidth, scrollHeight
        } = element;

        return new Viewport({
            element: element,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: scrollWidth,
            scrollHeight: scrollHeight,
            left: offsetLeft,
            top: offsetTop,
            width: offsetWidth,
            height: offsetHeight
        });
    }

    private _element: HTMLElement;
    private _left: number;
    private _width: number;
    private _height: number;
    private _top: number;
    private _scrollLeft: number;
    private _scrollTop: number;
    private _scrollWidth: number;
    private _scrollHeight: number;


    get left(): number {
        return this._left;
    }


    set left(val: number) {
        this._left = val;
        this._normalize();
    }


    get top(): number {
        return this._top;
    }


    set top(val: number) {
        this._top = val;
        this._normalize();
    }


    get right(): number {
        return this._left + this._width;
    }


    get bottom(): number {
        return this._top + this._height;
    }


    get width(): number {
        return this._width;
    }


    set width(val: number) {
        this._width = val;
        this._normalize();
    }

    get height(): number {
        return this._height;
    }


    set height(val: number) {
        this._height = val;
        this._normalize();
    }


    get scrollLeft(): number {
        return this._scrollLeft;
    }


    set scrollLeft(val: number) {
        this._scrollLeft = val;
        this._normalize();
    }


    get scrollTop(): number {
        return this._scrollTop;
    }


    set scrollTop(val: number) {
        this._scrollTop = val;
        this._normalize();
    }


    get scrollWidth(): number {
        return this._scrollWidth;
    }


    set scrollWidth(val: number) {
        this._scrollWidth = val;
        this._normalize();
    }


    get scrollHeight(): number {
        return this._scrollHeight;
    }


    set scrollHeight(val: number) {
        this._scrollHeight = val;
        this._normalize();
    }


    get clientWidth(): number {
        if (this._scrollWidth > this._width) {
            return this._width - getScrollBarWidth();
        } else {
            return this._width;
        }
    }


    get clientHeight(): number {
        if (this._scrollHeight > this._height) {
            return this._height - getScrollBarWidth();
        } else {
            return this._height;
        }
    }


    get isOverflowX(): boolean {
        return this._scrollWidth > this._width;
    }


    get isOverflowY(): boolean {
        return this._scrollHeight > this._height;
    }


    get isAtTop(): boolean {
        return this._scrollTop === 0;
    }


    get isAtLeft(): boolean {
        return this._scrollLeft === 0;
    }


    get isAtRight(): boolean {
        return this._scrollWidth - this._width === this._scrollWidth;
    }


    get isAtBottom(): boolean {
        return this._scrollHeight - this._height === this._scrollTop;
    }


    get element(): HTMLElement {
        return this._element;
    }


    constructor(viewport) {
        viewport = _defaults({}, viewport, DEFAULT_VIEWPORT);
        this._element = viewport.element;
        this._left = viewport.left;
        this._top = viewport.top;
        this._width = viewport.width;
        this._height = viewport.height;
        this._scrollLeft = viewport.scrollLeft;
        this._scrollTop = viewport.scrollTop;
        this._scrollWidth = viewport.scrollWidth;
        this._scrollHeight = viewport.scrollHeight;
        this._normalize();
    }


    _normalize() {
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