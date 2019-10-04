/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export namespace UriConstants {
  export const WINDOWS_ABSOLUTE_PATH_PATTERN: RegExp = /^\w*:[\\/]/i;
  export const UNIX_ABSOLUTE_PATH_PATTERN: RegExp = /^\//i;
  export const RELATIVE_PATH_PATTERN: RegExp = /^[.]{1,2}[\\/]/i;
}
