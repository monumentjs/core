

export interface Ordered {
    /**
     * Get the order payload of this object.
     * Higher values are interpreted as lower priority.
     * As a consequence, the object with the lowest payload has the highest priority.
     * Same order values will result in arbitrary sort positions for the affected objects.
     */
    readonly order: number;
}
