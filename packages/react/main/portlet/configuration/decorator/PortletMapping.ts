import {PortletMappingConfiguration} from './PortletMappingConfiguration';
import {PortletMappingDecorator} from './PortletMappingDecorator';

export function PortletMapping(configuration: PortletMappingConfiguration) {
    return function (...args: any[]) {
        new PortletMappingDecorator(configuration).apply(args);
    };
}
