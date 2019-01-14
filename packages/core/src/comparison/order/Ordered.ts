/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Ordered {
    /**
     * Get the order payload of this object.
     * Higher values are interpreted as higher priority.
     */
    readonly order: number;
}
