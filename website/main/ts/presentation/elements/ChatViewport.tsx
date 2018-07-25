import * as React from 'react';
import {mergeProps} from '../utils/ReactUtils';
import {Viewport} from './Viewport';


export function ChatViewport(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    const {children, ...others} = props;

    return (
        <Viewport {...mergeProps({
            className: 'ChatViewport'
        }, others)}>
            {children}
        </Viewport>
    );
}
