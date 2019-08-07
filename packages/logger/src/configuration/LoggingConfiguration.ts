import { Transport } from '../transport/Transport';

/**
 * Represents logging configuration.
 * @see LoggerManager
 * @since 0.14.0
 * @author Alex Chugaev
 */
export interface LoggingConfiguration {
  /**
   * Gets transports list.
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly transports: ReadonlyArray<Transport>;
}
