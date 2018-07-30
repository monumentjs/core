import * as React from 'react';
import {PortletProps} from './PortletProps';
import {PortletContext} from './Context';
import {PortletCore} from '../portlet/PortletCore';
import {PortletState} from './PortletState';
import {NullPointerException} from '@monument/core/main/exceptions/NullPointerException';
import {PortalProps} from './PortalProps';
import {RepeatableNumberGenerator} from '@monument/core/main/data/generator/RepeatableNumberGenerator';


export class Portlet extends React.Component<PortletProps, PortletState> {
    private readonly _hashGenerator: RepeatableNumberGenerator = new RepeatableNumberGenerator();
    private _portlet: PortletCore | undefined;

    public constructor(props: PortletProps) {
        super(props);

        this.state = {
            isInitialized: false,
            isEditing: false,
            hash: this._hashGenerator.next()
        };
    }

    public render() {
        return (
            <PortletContext>
                {
                    (portal: PortalProps | undefined) => {
                        if (portal == null) {
                            throw new NullPointerException('Portlet is not inside portal');
                        }

                        if (this._portlet == null) {
                            portal.portletContainer.getPortlet(this.props.id).then((portlet: PortletCore) => {
                                this.setPortlet(portlet);
                            });

                            return null;
                        }

                        return this._portlet.render();
                    }
                }
            </PortletContext>
        );
    }

    private setPortlet(portlet: PortletCore): void {
        this._portlet = portlet;
        this._portlet.propertyChanged.subscribe(() => {
            this.setState({
                hash: this._hashGenerator.next()
            });
        });

        this.setState({
            isInitialized: true
        });
    }
}
