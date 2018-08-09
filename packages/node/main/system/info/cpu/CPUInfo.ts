import {arch, CpuInfo, cpus} from 'os';
import {CPUArchitecture} from './CPUArchitecture';


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
