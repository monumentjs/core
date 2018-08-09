import {freemem, totalmem} from 'os';
import {MemorySize} from '@monument/core/main/MemorySize';


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
