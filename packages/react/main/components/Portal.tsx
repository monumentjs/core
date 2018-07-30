import * as React from 'react';
import {PortalContext} from './Context';
import {PortalProps} from './PortalProps';


export class Portal extends React.Component<PortalProps> {

    public render() {
        return (
            <PortalContext value={this.props}>
                {this.props.children}
            </PortalContext>
        );
    }
}
