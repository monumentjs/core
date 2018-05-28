import {arch, CpuInfo, cpus} from 'os';
import {Lazy} from '@monument/decorators/main/stereotype/configuration/Lazy';
import {Singleton} from '@monument/decorators/main/stereotype/Singleton';
import {CPUArchitecture} from './CPUArchitecture';


@Lazy
@Singleton
export class CPUInfo {
    private _cores: CpuInfo[] | undefined;
    private _architecture: CPUArchitecture | undefined;


    public get coresCount(): number {
        if (this._cores == null) {
            this._cores = cpus();
        }

        return this._cores.length;
    }


    public get architecture(): CPUArchitecture {
        if (this._architecture == null) {
            this._architecture = arch() as CPUArchitecture;
        }

        return this._architecture;
    }

}
