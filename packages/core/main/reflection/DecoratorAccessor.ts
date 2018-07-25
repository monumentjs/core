import {ReadOnlySet} from '../collection/ReadOnlySet';


export interface DecoratorAccessor {
    /**
     * Returns read-only set of associated decorators.
     */
    readonly decorators: ReadOnlySet<Function>;

    decorate(decorator: Function): boolean;
    isDecoratedWith(decorator: Function): boolean;
}
