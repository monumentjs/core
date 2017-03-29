import {assertArgumentNotNull} from '../../Assertion/Assert';
import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import {StandardIOMode} from './types';


export default class ProcessStartInfo {
    public fileName: string;
    public commandLineArguments: string[];
    public environment: {[key: string]: string} = undefined;    // TODO: create special class for environment variables
    public isDetached: boolean = false;
    public shellName: string = '';
    public useShellExecute: boolean = false;
    public workingDirectory: string = process.cwd();
    public ownerUserId: number = undefined;
    public ownerGroupId: number = undefined;
    public standardInput: IInternalStreamProvider<any> | StandardIOMode = 'pipe';
    public standardOutput: IInternalStreamProvider<any> | StandardIOMode = 'pipe';
    public standardError: IInternalStreamProvider<any> | StandardIOMode = 'pipe';

    
    public constructor(fileName: string, ...commandLineArguments: string[]) {
        assertArgumentNotNull('fileName', fileName);

        this.fileName = fileName;
        this.commandLineArguments = commandLineArguments;
    }
}
