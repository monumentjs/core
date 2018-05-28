import {freemem, totalmem} from 'os';
import {MemorySize} from '@monument/core/main/MemorySize';
import {Singleton} from '@monument/decorators/main/stereotype/Singleton';
import {Lazy} from '@monument/decorators/main/stereotype/configuration/Lazy';


@Lazy
@Singleton
export class RAMInfo {
    public get total(): MemorySize {
        return new MemorySize(totalmem());
    }


    public get used(): MemorySize {
        return new MemorySize(totalmem() - freemem());
    }


    public get free(): MemorySize {
        return new MemorySize(freemem());
    }


    public get usageRatio(): number {
        return freemem() / totalmem();
    }
}
