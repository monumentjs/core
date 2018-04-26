import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';


export interface DecoratorAccessor {
    /**
     * Returns read-only set of associated decorators.
     */
    readonly decorators: ReadOnlySet<Function>;

    decorate(decorator: Function): boolean;
    isDecoratedWith(decorator: Function): boolean;
}
