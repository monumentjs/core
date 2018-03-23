import {ReadOnlySet} from '../../collections-core/main/ReadOnlySet';


export interface DecoratorAccessor {
    /**
     * Returns read-only mapping of associated decorator.
     */
    readonly decorators: ReadOnlySet<Function>;

    decorate(decorator: Function): boolean;
    isDecoratedWith(decorator: Function): boolean;
}
