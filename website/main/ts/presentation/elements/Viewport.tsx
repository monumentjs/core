import * as React from 'react';
import {mergeProps} from '../utils/ReactUtils';


export function Viewport(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    const {children, ...others} = props;

    return (
        <div {...mergeProps({
            className: 'Viewport'
        }, others)}>
            <div className="Viewport_Panel">{children}</div>
        </div>
    );
}
