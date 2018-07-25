import * as React from 'react';
import {Alignment} from './Alignment';


export interface PanelAttributes extends React.HTMLAttributes<HTMLDivElement> {
    readonly vertical?: Alignment;
    readonly horizontal?: Alignment;
    readonly 'data-vertical'?: Alignment;
    readonly 'data-horizontal'?: Alignment;
}
