import {ReadOnlySet} from '../../collections/main/ReadOnlySet';
import {DecoratorAccessor} from './DecoratorAccessor';


export interface HierarchicalDecoratorAccessor extends DecoratorAccessor {
    parent: HierarchicalDecoratorAccessor | undefined;
    readonly declaredDecorators: ReadOnlySet<Function>;


}
