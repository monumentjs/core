import { UriComponents } from './UriComponents';
import { UriConstants } from './UriConstants';
import { UriSchema } from './UriSchema';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class UriComponentsNormalizer {
  normalize(components: UriComponents): UriComponents {
    return {
      schema: this.getNormalizedSchema(components),
      userName: components.userName,
      password: components.password,
      host: this.getNormalizedHost(components),
      port: components.port,
      path: this.getNormalizedPath(components),
      queryParameters: components.queryParameters,
      fragment: components.fragment
    };
  }

  private getNormalizedHost(components: UriComponents): string | undefined {
    const { schema, host } = components;

    if (UriSchema.FILE.equals(schema)) {
      if (!host) {
        return UriSchema.FILE.defaultHost;
      }
    }

    return host;
  }

  private getNormalizedPath(components: UriComponents): string | undefined {
    const { path } = components;

    if (path) {
      const isWindowsAbsolutePath = UriConstants.WINDOWS_ABSOLUTE_PATH_PATTERN.test(path);

      let normalizedPath = path;

      if (isWindowsAbsolutePath) {
        normalizedPath = UriConstants.PATH_FRAGMENT_DELIMITER + path;
      }

      normalizedPath = normalizedPath.replace(/[\\/]+/g, UriConstants.PATH_FRAGMENT_DELIMITER);

      return normalizedPath;
    }

    return path;
  }

  private getNormalizedSchema(components: UriComponents): string | undefined {
    const { schema } = components;

    if (schema == null) {
      return schema;
    }

    return schema.toLowerCase();
  }
}
