export class UriEncoder {
  decodeComponent(component: string): string;
  decodeComponent(component: string | undefined): string | undefined {
    return component == null ? component : decodeURIComponent(component);
  }

  decodeUri(uri: string): string;

  decodeUri(uri: string | undefined): string | undefined {
    return uri == null ? uri : decodeURI(uri);
  }

  encodeComponent(component: string): string;

  encodeComponent(component: string | undefined): string | undefined {
    return component == null ? component : encodeURIComponent(component);
  }

  encodeUri(uri: string): string;

  encodeUri(uri: string | undefined): string | undefined {
    return uri == null ? uri : encodeURI(uri);
  }
}
