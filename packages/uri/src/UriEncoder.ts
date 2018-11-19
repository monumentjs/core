

export class UriEncoder {
    public decodeComponent(component: string): string;
    public decodeComponent(component: string | undefined): string | undefined {
        return component == null ? component : decodeURIComponent(component);
    }

    public encodeComponent(component: string): string;
    public encodeComponent(component: string | undefined): string | undefined {
        return component == null ? component : encodeURIComponent(component);
    }

    public encodeUri(uri: string): string;
    public encodeUri(uri: string | undefined): string | undefined {
        return uri == null ? uri : encodeURI(uri);
    }

    public decodeUri(uri: string): string;
    public decodeUri(uri: string | undefined): string | undefined {
        return uri == null ? uri : decodeURI(uri);
    }
}
