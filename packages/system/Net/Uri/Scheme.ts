import {CaseInsensitiveMap} from '@monument/collections/main/CaseInsensitiveMap';
import {Map} from '../../../collections/main/Map';
import {KeyValuePair} from '../../../collections/main/KeyValuePair';
import {InvalidOperationException} from '../../../core/main/exceptions/InvalidOperationException';


export enum Scheme {
    Unknown = '',
    FILE = 'file',
    FTP = 'ftp',
    HTTP = 'http',
    HTTPS = 'https',
    SSH = 'ssh',
    TelNet = 'telnet',
    SMTP = 'smtp',
}


export namespace Scheme {
    const DEFAULT_PORTS: Map<string, number> = new CaseInsensitiveMap([
        new KeyValuePair(Scheme.FTP, 21),
        new KeyValuePair(Scheme.HTTP, 80),
        new KeyValuePair(Scheme.HTTPS, 443),
        new KeyValuePair(Scheme.SSH, 22),
        new KeyValuePair(Scheme.TelNet, 23),
        new KeyValuePair(Scheme.SMTP, 25)
    ]);


    export function isDefaultPort(scheme: Scheme, port: number): boolean {
        return DEFAULT_PORTS.containsEntry(scheme, port);
    }


    export function getDefaultPort(scheme: Scheme): number {
        let defaultPort: number | undefined = DEFAULT_PORTS.get(scheme);

        if (defaultPort == null) {
            throw new InvalidOperationException(`Scheme is unknown or does not supports ports.`);
        }

        return defaultPort;
    }
}
