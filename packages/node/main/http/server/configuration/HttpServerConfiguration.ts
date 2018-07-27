import {SslConfiguration} from '../security/SslConfiguration';
import {HttpAddress} from '../../HttpAddress';
import {Duration} from '@monument/core/main/time/Duration';
import {HttpProtocol} from '../../protocol/HttpProtocol';


export class HttpServerConfiguration {
    public constructor(
        public readonly address: HttpAddress,
        public readonly protocol: HttpProtocol = HttpProtocol.DEFAULT,
        public readonly keepAliveTimeout?: Duration,
        public readonly sslConfiguration?: SslConfiguration
    ) {}
}
