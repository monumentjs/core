import {IApplicationConfiguration} from '../../../../Source/Application/IApplicationConfiguration';


export class TestApplicationConfiguration implements IApplicationConfiguration {
    public readonly applicationId: number = 0;
    public readonly applicationName: string = 'Test Application';


    public checkValidity(): void {
        // Stub
    }


    public activate(): boolean {
        return true;
    }
    
}
