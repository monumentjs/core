import * as React from 'react';
import {StackLayoutDirection} from './StackLayoutDirection';


export interface StackLayoutAttributes extends React.HTMLAttributes<HTMLDivElement> {
    readonly direction?: StackLayoutDirection;
    readonly reversed?: boolean;
    readonly 'data-direction'?: StackLayoutDirection;
    readonly 'data-reversed'?: boolean;
}
