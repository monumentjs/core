

export class SslConfiguration {
    public readonly key: string | Buffer;
    public readonly certificate: string | Buffer;
    public readonly password: string | undefined;

    public constructor(key: string | Buffer, certificate: string | Buffer, password?: string) {
        this.key = key;
        this.certificate = certificate;
        this.password = password;
    }
}
