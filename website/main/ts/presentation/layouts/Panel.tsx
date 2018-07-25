import * as React from 'react';
import {notNullOrFallback, renderElement} from '../utils/ReactUtils';
import {PanelAttributes} from './PanelAttributes';
import {Alignment} from './Alignment';


export function Panel(props: PanelAttributes): JSX.Element {
    let {horizontal, vertical, ...others} = props;

    horizontal = notNullOrFallback<Alignment>(horizontal, Alignment.START);
    vertical = notNullOrFallback<Alignment>(vertical, Alignment.CENTER);

    return renderElement('div', {
        'className': 'Panel',
        'data-vertical': vertical,
        'data-horizontal': horizontal
    }, others);
}
