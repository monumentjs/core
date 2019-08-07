/**
 * Represents result of {@link Filter} decision.
 * @see Filter.onMatch
 * @see Filter.onMismatch
 * @see MatchingFilter.decide
 * @see Transport
 * @see TransportBase.next
 * @since 0.14.0
 * @author Alex Chugaev
 */
export enum FilterDecision {
  /**
   * Filter cannot make exact decision whether log event should be allowed or rejected.
   * Following filters decision required.
   * @see MatchingFilter.decide
   * @see TransportBase.next
   * @since 0.14.0
   * @author Alex Chugaev
   */
  NEUTRAL,

  /**
   * Filter have made exact decision to allow log event.
   * Following filters decision not required.
   * @see MatchingFilter.decide
   * @see TransportBase.next
   * @since 0.14.0
   * @author Alex Chugaev
   */
  ALLOW,

  /**
   * Filter have made exact decision to deny log event.
   * Following filters decision not required.
   * @see MatchingFilter.decide
   * @see TransportBase.next
   * @since 0.14.0
   * @author Alex Chugaev
   */
  DENY
}
