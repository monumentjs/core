import { Components } from './component/Components';
import { UriConstants } from './UriConstants';
import { Scheme } from './component/Scheme';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class UriComponentsNormalizer {
  normalize(components: Components): Components {
    return {
      schema: this.getNormalizedSchema(components),
      userName: components.userName,
      password: components.password,
      host: this.getNormalizedHost(components),
      port: components.port,
      path: this.getNormalizedPath(components),
      queryParameters: components.query,
      fragment: components.fragment
    };
  }

  private getNormalizedHost(components: Components): string | undefined {
    const { scheme, host } = components;

    if (Scheme.FILE.equals(scheme)) {
      if (!host) {
        return Scheme.FILE.defaultHost;
      }
    }

    return host;
  }

  private getNormalizedPath(components: Components): string | undefined {
    const { path } = components;

    if (path) {
      const isWindowsAbsolutePath = UriConstants.WINDOWS_ABSOLUTE_PATH_PATTERN.test(path);

      let normalizedPath = path;

      if (isWindowsAbsolutePath) {
        normalizedPath = '/' + path;
      }

      normalizedPath = normalizedPath.replace(/[\\/]+/g, '/');

      return normalizedPath;
    }

    return path;
  }

  private getNormalizedSchema(components: Components): string | undefined {
    const { scheme } = components;

    if (scheme == null) {
      return scheme;
    }

    return scheme.toLowerCase();
  }
}
