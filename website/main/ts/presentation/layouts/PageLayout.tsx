import * as React from 'react';
import {renderElement} from '../utils/ReactUtils';


export function PageLayout(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('div', {
        className: 'PageLayout'
    }, props);
}

export function PageHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('header', {
        className: 'PageHeader'
    }, props);
}

export function PageBody(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('div', {
        className: 'PageBody'
    }, props);
}

export function PageColumn(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('div', {
        className: 'PageColumn'
    }, props);
}

export function PageFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('footer', {
        className: 'PageFooter'
    }, props);
}

export function PageSidebar(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('aside', {
        className: 'PageSidebar'
    }, props);
}

export function PageMain(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('main', {
        className: 'PageMain'
    }, props);
}
