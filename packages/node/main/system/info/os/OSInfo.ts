import {endianness, EOL, platform, uptime} from 'os';
import {ByteOrder} from '../../../ByteOrder';
import {Platform} from './Platform';
import {Lazy} from '@monument/core/main/stereotype/configuration/Lazy';
import {Singleton} from '@monument/core/main/stereotype/Singleton';
import {Duration} from '@monument/core/main/time/Duration';


@Lazy
@Singleton
export class OSInfo {
    public get platform(): Platform {
        return platform() as Platform;
    }


    public get byteOrder(): ByteOrder {
        if (endianness() === 'BE') {
            return ByteOrder.BIG_ENDIAN;
        } else {
            return ByteOrder.LITTLE_ENDIAN;
        }
    }


    public get endOfLine(): string {
        return EOL;
    }


    public get uptime(): Duration {
        return new Duration(0, 0, uptime());
    }
}
