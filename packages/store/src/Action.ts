/**
 * Represents action.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export interface Action<P = any> {
  /**
   * Gets action type.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly type: string;

  /**
   * Gets action payload.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  readonly payload: P;
}
