

export class HttpAddress {
    public static readonly DEFAULT_HOST: string = 'localhost';
    public static readonly DEFAULT_PORT: number = 3004;

    public readonly host: string;
    public readonly port: number;

    public constructor(host: string = HttpAddress.DEFAULT_HOST, port: number = HttpAddress.DEFAULT_PORT) {
        this.host = host;
        this.port = port;
    }
}
