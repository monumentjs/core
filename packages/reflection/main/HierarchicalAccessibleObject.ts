import {HierarchicalAttributeAccessor} from '@monument/object-model/main/attributes/HierarchicalAttributeAccessor';
import {HierarchicalDecoratorAccessor} from './HierarchicalDecoratorAccessor';


export interface HierarchicalAccessibleObject extends HierarchicalAttributeAccessor, HierarchicalDecoratorAccessor {
    readonly parent: HierarchicalAccessibleObject | undefined;
}
