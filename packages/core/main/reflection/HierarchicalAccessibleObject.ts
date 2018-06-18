import {HierarchicalAttributeAccessor} from '../object-model/attributes/HierarchicalAttributeAccessor';
import {HierarchicalDecoratorAccessor} from './HierarchicalDecoratorAccessor';


export interface HierarchicalAccessibleObject extends HierarchicalAttributeAccessor, HierarchicalDecoratorAccessor {
    readonly parent: HierarchicalAccessibleObject | undefined;
}
