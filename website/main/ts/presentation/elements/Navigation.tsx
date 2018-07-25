import * as React from 'react';
import {renderElement} from '../utils/ReactUtils';


export function Nav(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('nav', {
        className: 'Nav',
        role: 'navigation'
    }, props);
}


export function NavMenu(props: React.HTMLAttributes<HTMLUListElement>): JSX.Element {
    return renderElement('ul', {
        className: 'NavMenu'
    }, props);
}


export function NavMenuItem(props: React.HTMLAttributes<HTMLLIElement>): JSX.Element {
    return renderElement('li', {
        className: 'NavMenuItem'
    }, props);
}
