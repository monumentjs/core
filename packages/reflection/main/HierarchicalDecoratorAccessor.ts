import {ReadOnlySet} from '../../collections-core/main/ReadOnlySet';
import {DecoratorAccessor} from './DecoratorAccessor';


export interface HierarchicalDecoratorAccessor extends DecoratorAccessor {
    parent: HierarchicalDecoratorAccessor | undefined;
    readonly declaredDecorators: ReadOnlySet<Function>;


}
