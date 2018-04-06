import {Set} from '../../collections/main/Set';
import {ReadOnlySet} from '../../collections/main/ReadOnlySet';
import {ListSet} from '@monument/collections/main/ListSet';
import {HierarchicalDecoratorAccessor} from './HierarchicalDecoratorAccessor';


export class DefaultHierarchicalDecoratorAccessor implements HierarchicalDecoratorAccessor {
    private readonly _decorators: Set<Function> = new ListSet();
    private _parent: HierarchicalDecoratorAccessor | undefined;


    public get parent(): HierarchicalDecoratorAccessor | undefined {
        return this._parent;
    }


    public set parent(parent: HierarchicalDecoratorAccessor | undefined) {
        this._parent = parent;
    }


    public get decorators(): ReadOnlySet<Function> {
        let allDecorators: Set<Function> = new ListSet();
        let accessor: HierarchicalDecoratorAccessor | undefined = this;

        while (accessor != null) {
            allDecorators.addAll(accessor.declaredDecorators);

            accessor = accessor.parent;
        }

        return allDecorators;
    }


    public get declaredDecorators(): ReadOnlySet<Function> {
        return this._decorators;
    }


    public constructor(parent?: HierarchicalDecoratorAccessor) {
        this._parent = parent;
    }


    public isDecoratedWith(decorator: Function): boolean {
        let accessor: HierarchicalDecoratorAccessor | undefined = this;

        while (accessor != null) {
            if (accessor.declaredDecorators.contains(decorator)) {
                return true;
            }

            accessor = accessor.parent;
        }

        return false;
    }


    public decorate(decorator: Function): boolean {
        return this._decorators.add(decorator);
    }
}
