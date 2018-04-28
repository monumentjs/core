import {Supplier} from '@monument/core/main/Supplier';
import {Consumer} from '@monument/core/main/Consumer';
import {ObjectFactory} from './ObjectFactory';

/**
 * A variant of ObjectFactory designed specifically for injection points,
 * allowing for programmatic optionality and lenient not-unique handling.
 */
export interface ObjectProvider<T> extends ObjectFactory<T> {
    /**
     * Return an instance (possibly shared or independent) of the reflection managed by this factory.
     */
    getIfAvailable(defaultSupplier?: Supplier<T>): T | undefined;

    /**
     * Return an instance (possibly shared or independent) of the reflection managed by this factory.
     * @returns an instance of the unit, or the supplied default reflection if no such unit is available
     * or if it is not unique in the factory (i.e. multiple candidates found with none marked as primary)
     */
    getIfUnique(defaultSupplier?: Supplier<T>): T | undefined;

    getObject(...args: any[]): T;

    /**
     * Consume an instance (possibly shared or independent) of the reflection managed by this factory, if available.
     */
    ifAvailable(dependencyConsumer: Consumer<T>): void;

    /**
     * Consume an instance (possibly shared or independent) of the reflection managed by this factory, if unique.
     */
    ifUnique(dependencyConsumer: Consumer<T>): void;
}
