import {PortletFactory} from '../factory/PortletFactory';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';

/**
 * Usually encapsulates:
 * - portlet definition registry
 * - parent context (optional)
 */
export interface PortletContainer extends PortletFactory {
    readonly portletIds: ReadOnlySet<string>;
}
