import {ReadOnlySet} from '../../collections-core/main/ReadOnlySet';
import {Set} from '../../collections-core/main/Set';
import {ListSet} from '../../collections/main/ListSet';
import {DecoratorAccessor} from './DecoratorAccessor';


export class DefaultDecoratorAccessor implements DecoratorAccessor {
    private readonly _decorators: Set<Function> = new ListSet();


    public get decorators(): ReadOnlySet<Function> {
        return this._decorators;
    }


    public isDecoratedWith(decorator: Function): boolean {
        return this._decorators.contains(decorator);
    }


    public decorate(decorator: Function): boolean {
        return this._decorators.add(decorator);
    }
}
