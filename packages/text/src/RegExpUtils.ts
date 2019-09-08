/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class RegExpUtils {
  static escape(pattern: string): string {
    return pattern.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
  }
}
