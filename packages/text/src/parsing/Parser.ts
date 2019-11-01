/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Parser<O> {
  /**
   * @author Alex Chugaev
   * @since 0.0.1
   */
  canParse(source: string): boolean;

  /**
   * @throws {RuntimeException}
   * @author Alex Chugaev
   * @since 0.0.1
   */
  parse(source: string): O;
}
