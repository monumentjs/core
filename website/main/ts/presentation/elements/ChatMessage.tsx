import * as React from 'react';
import {mergeProps, renderElement} from '../utils/ReactUtils';


export function ChatMessage(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    const {children, ...others} = props;

    return (
        <div {...mergeProps({
            className: 'ChatMessage'
        }, others)}>
            {children}
        </div>
    );
}

export namespace ChatMessage {
    export function Body(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
        return renderElement('div', {
            className: 'ChatMessage_Body'
        }, props);
    }
}
