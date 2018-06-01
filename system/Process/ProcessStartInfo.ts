import {ProcessIOMode} from './ProcessIOMode';
import {StandardInputStream} from './StandardInputStream';
import {StandardOutputStream} from './StandardOutputStream';
import {StandardErrorStream} from './StandardErrorStream';


export class ProcessStartInfo {
    public fileName: string;
    public commandLineArguments: string[];
    public environment: NodeJS.ProcessEnv = process.env;
    public isDetached: boolean = false;
    public shellName: string = '';
    public useShellExecute: boolean = false;
    public workingDirectory: string = process.cwd();
    public ownerUserId: number;
    public ownerGroupId: number;
    public standardInput: StandardInputStream | ProcessIOMode = ProcessIOMode.Pipe;
    public standardOutput: StandardOutputStream | ProcessIOMode = ProcessIOMode.Pipe;
    public standardError: StandardErrorStream | ProcessIOMode = ProcessIOMode.Pipe;


    public constructor(fileName: string, ...commandLineArguments: string[]) {
        this.fileName = fileName;
        this.commandLineArguments = commandLineArguments;
    }
}
