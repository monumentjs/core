import {PortletCore} from '../PortletCore';


export interface PortletFactory {
    getPortlet(id: string): Promise<PortletCore>;
}
