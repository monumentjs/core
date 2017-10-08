import {DateTime} from '../../../Time/DateTime';
import {Version} from '../../../Version/Version';
import {IUnitFactory} from './IUnitFactory';


export interface IApplicationContext extends IUnitFactory {
    readonly applicationName: string;
    readonly applicationId: string;
    readonly applicationVersion: Version;
    readonly startDate: DateTime;
}
