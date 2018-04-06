import {ReadOnlySet} from '../../collections/main/ReadOnlySet';
import {Set} from '../../collections/main/Set';
import {ListSet} from '@monument/collections/main/ListSet';
import {DecoratorAccessor} from './DecoratorAccessor';


export class DefaultDecoratorAccessor implements DecoratorAccessor {
    private readonly _decorators: Set<Function> = new ListSet();


    public get decorators(): ReadOnlySet<Function> {
        return this._decorators;
    }


    public isDecoratedWith(annotation: Function): boolean {
        return this._decorators.contains(annotation);
    }


    public decorate(annotation: Function): boolean {
        return this._decorators.add(annotation);
    }
}
