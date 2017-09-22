import {DateTime} from '../../../Time/DateTime';
import {Version} from '../../../Version/Version';


export interface IApplicationContext {
    readonly applicationName: string;
    readonly applicationId: string;
    readonly applicationVersion: Version;
    readonly startDate: DateTime;
}
