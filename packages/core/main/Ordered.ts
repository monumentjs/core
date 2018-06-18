

export interface Ordered {
    /**
     * Get the order payload of this object.
     * Higher values are interpreted as higher priority.
     */
    readonly order: number;
}
