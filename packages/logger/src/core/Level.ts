/**
 * Levels of log event.
 * @see LogEvent.level
 * @since 0.14.0
 * @author Alex Chugaev
 */
export enum Level {
  OFF,
  /**
   * @see Logger.error
   * @since 0.14.0
   * @author Alex Chugaev
   */
  ERROR,
  /**
   * @see Logger.warning
   * @since 0.14.0
   * @author Alex Chugaev
   */
  WARNING,
  /**
   * @see Logger.info
   * @since 0.14.0
   * @author Alex Chugaev
   */
  INFO,
  /**
   * @see Logger.debug
   * @since 0.14.0
   * @author Alex Chugaev
   */
  DEBUG,
  /**
   * @see Logger.trace
   * @since 0.14.0
   * @author Alex Chugaev
   */
  TRACE,
  ALL
}
