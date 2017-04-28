import {assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import {ProcessIOMode} from './types';
import {Dictionary} from '../../Core/Collections/Dictionary';


export class ProcessStartInfo {
    public fileName: string;
    public commandLineArguments: string[];
    public environment: Dictionary<string, string> = new Dictionary<string, string>();
    public isDetached: boolean = false;
    public shellName: string = '';
    public useShellExecute: boolean = false;
    public workingDirectory: string = process.cwd();
    public ownerUserId: number = undefined;
    public ownerGroupId: number = undefined;
    public standardInput: IInternalStreamProvider<any> | ProcessIOMode = ProcessIOMode.Pipe;
    public standardOutput: IInternalStreamProvider<any> | ProcessIOMode = ProcessIOMode.Pipe;
    public standardError: IInternalStreamProvider<any> | ProcessIOMode = ProcessIOMode.Pipe;

    
    public constructor(fileName: string, ...commandLineArguments: string[]) {
        assertArgumentNotNull('fileName', fileName);

        this.fileName = fileName;
        this.commandLineArguments = commandLineArguments;
    }
}
