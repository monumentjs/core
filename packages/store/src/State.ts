/**
 * Represents basic interface each state must implement to provide snapshot of the state.
 * @since 0.11.0
 * @author Alex Chugaev
 */
export interface State<TSnapshot> {
  /**
   * Gets snapshot of the state.
   * @since 0.11.0
   * @author Alex Chugaev
   */
  getSnapshot(): TSnapshot;
}
