/**
 * Represents action.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export interface Action<P = any> {
  readonly type: string;
  readonly payload: P;
}
