import {IApplicationConfiguration} from './IApplicationConfiguration';


export interface IApplicationContext {
    applicationId: number;
    applicationName: string;
    applicationConfiguration: IApplicationConfiguration;
}
