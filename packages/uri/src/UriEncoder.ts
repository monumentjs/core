

export class UriEncoder {
    public decodeComponent(component: string): string;
    public decodeComponent(component: string | undefined): string | undefined {
        return component == null ? component : decodeURIComponent(component);
    }

    public encodeComponent(component: string): string;
    public encodeComponent(component: string | undefined): string | undefined {
        return component == null ? component : encodeURIComponent(component);
    }
}
