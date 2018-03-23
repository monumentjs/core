

export interface Cloneable<T> {
    /**
     * Creates new reflection that is a copy of the current instance.
     */
    clone(): T;
}
