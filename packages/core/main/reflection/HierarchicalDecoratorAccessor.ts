import {ReadOnlySet} from '../collection/readonly/ReadOnlySet';
import {DecoratorAccessor} from './DecoratorAccessor';


export interface HierarchicalDecoratorAccessor extends DecoratorAccessor {
    parent: HierarchicalDecoratorAccessor | undefined;
    readonly declaredDecorators: ReadOnlySet<Function>;


}
