
export interface ObjectFactory<T> {
    /**
     * Return an instance (possibly shared or independent) of the reflection managed by this factory.
     */
    getObject(): T;
}
