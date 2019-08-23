
/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export function IgnoreCaseEquals(current: string | null | undefined, other: string | null | undefined): boolean {
  if (current == null && other == null) {
    return true;
  }

  if (current == null || other == null) {
    return false;
  }

  if (current.length !== other.length) {
    return false;
  }

  return current.toLowerCase() === other.toLowerCase();
}
