import { Equatable } from '@monument/comparison';
import { TimeZoneOffset } from './TimeZoneOffset';

/**
 * Represents time zone.
 * @since 0.14.1
 * @author Alex Chugaev
 */
export class TimeZone implements Equatable<TimeZone> {

  /**
   * Gets time zone offset.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly offset: TimeZoneOffset;

  /**
   * Gets time zone abbreviation.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly abbreviation?: string;

  /**
   * Gets time zone name.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly name?: string;

  /**
   * Initializes new instance with custom time zone offset and code.
   * @param offset Time zone offset.
   * @param abbreviation Time zone code.
   * @param name Time zone name.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  constructor(offset: TimeZoneOffset, abbreviation?: string, name?: string) {
    this.offset = offset;
    this.abbreviation = abbreviation;
    this.name = name;
  }

  equals(other: TimeZone): boolean {
    return this.offset.equals(other.offset);
  }
}
