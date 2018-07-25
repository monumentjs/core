import * as React from 'react';
import {StackLayoutAttributes} from './StackLayoutAttributes';
import {StackLayoutDirection} from './StackLayoutDirection';
import {notNullOrFallback, renderElement} from '../utils/ReactUtils';


export function StackLayout(props: StackLayoutAttributes): JSX.Element {
    let {direction, reversed, ...other} = props;

    direction = notNullOrFallback<StackLayoutDirection>(direction, StackLayoutDirection.VERTICAL);
    reversed = notNullOrFallback<boolean>(reversed, false);

    return renderElement('div', {
        'className': 'StackLayout',
        'data-direction': direction,
        'data-reversed': reversed
    }, other);
}

export function StackLayoutBlock(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('div', {
        className: 'StackLayoutBlock'
    }, props);
}

export function StackLayoutBody(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('div', {
        className: 'StackLayoutBody'
    }, props);
}
