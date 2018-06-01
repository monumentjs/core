

export interface MimeTypeDefinition {
    readonly source?: string;
    readonly extensions?: string[];
    readonly compressible?: boolean;
    readonly charset?: string;
}
