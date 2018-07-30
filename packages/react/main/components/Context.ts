import * as React from 'react';
import {PortalProps} from './PortalProps';

const context: React.Context<PortalProps | undefined> = React.createContext<PortalProps | undefined>(undefined);

/*tslint:disable:variable-name*/

export const PortletContext: React.Consumer<PortalProps | undefined> = context.Consumer;
export const PortalContext: React.Provider<PortalProps | undefined> = context.Provider;
