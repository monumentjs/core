import * as React from 'react';
import {renderElement} from '../utils/ReactUtils';


export function Content(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    return renderElement('div', {
        className: 'Content'
    }, props);
}
