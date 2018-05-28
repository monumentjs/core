import {endianness, EOL, platform, uptime} from 'os';
import {Singleton} from '@monument/decorators/main/stereotype/Singleton';
import {Lazy} from '@monument/decorators/main/stereotype/configuration/Lazy';
import {Duration} from '@monument/time/main/Duration';
import {ByteOrder} from '../../../ByteOrder';
import {Platform} from './Platform';


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
