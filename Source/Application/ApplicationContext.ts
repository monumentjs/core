import {UnitFactory} from '../DI/Unit/UnitFactory';
import {IApplicationContext} from '../DI/Unit/Abstraction/IApplicationContext';
import {DateTime} from '../Time/DateTime';
import {Version} from '../Version/Version';
import {ApplicationContextAwareUnitPostProcessor} from '../DI/Unit/PostProcessor/ApplicationContextAwareUnitPostProcessor';


export class ApplicationContext extends UnitFactory implements IApplicationContext {
    private _applicationName: string;
    private _applicationId: string;
    private _applicationVersion: Version;
    private _startDate: DateTime = DateTime.now;

    public get applicationName(): string {
        return this._applicationName;
    }


    public get applicationId(): string {
        return this._applicationId;
    }


    public get applicationVersion(): Version {
        return this._applicationVersion;
    }


    public get startDate(): DateTime {
        return this._startDate;
    }


    public constructor(applicationName: string, applicationId: string, applicationVersion: Version) {
        super();

        this._applicationName = applicationName;
        this._applicationId = applicationId;
        this._applicationVersion = applicationVersion;

        this.addUnitPostProcessor(new ApplicationContextAwareUnitPostProcessor(this));
    }
}
