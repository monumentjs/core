import {Runtime} from '../../../Core/Runtime/Runtime';
import {RuntimeID} from '../../../Core/Runtime/RuntimeID';


let scrollBarWidth;


export function updateScrollBarWidth() {
    let elementWidthWithoutScrollBar;
    let elementWidthWithScrollBar;
    let outerElement;
    let innerElement;

    if (Runtime.id !== RuntimeID.Browser) {
        return 0;
    }

    innerElement = document.createElement('div');
    innerElement.style.width = '100%';
    innerElement.style.height = '200px';

    outerElement = document.createElement('div');
    outerElement.style.position = 'absolute';
    outerElement.style.top = '0px';
    outerElement.style.left = '0px';
    outerElement.style.visibility = 'hidden';
    outerElement.style.width = '200px';
    outerElement.style.height = '150px';
    outerElement.style.overflow = 'hidden';
    outerElement.appendChild(innerElement);

    document.body.appendChild(outerElement);
    elementWidthWithoutScrollBar = innerElement.offsetWidth;
    outerElement.style.overflow = 'scroll';
    elementWidthWithScrollBar = innerElement.offsetWidth;

    if (elementWidthWithoutScrollBar === elementWidthWithScrollBar) {
        elementWidthWithScrollBar = outerElement.clientWidth;
    }

    document.body.removeChild(outerElement);

    scrollBarWidth = (elementWidthWithoutScrollBar - elementWidthWithScrollBar);

    return scrollBarWidth;
}


export function getScrollBarWidth() {
    if (Runtime.id !== RuntimeID.Browser) {
        return 0;
    }

    if (typeof scrollBarWidth !== 'number') {
        updateScrollBarWidth();
    }

    return scrollBarWidth;
}