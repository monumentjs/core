import {Writable, Readable} from 'stream';
import {Assert} from '../../Core/Assertion/Assert';
import {ProcessIOMode} from './types';
import {Dictionary} from '../../Core/Collections/Dictionary';
import {IStreamAdapter} from '../Stream/IStreamAdapter';


export class ProcessStartInfo {
    public fileName: string;
    public commandLineArguments: string[];
    public environment: Dictionary<string, string> = new Dictionary<string, string>();
    public isDetached: boolean = false;
    public shellName: string = '';
    public useShellExecute: boolean = false;
    public workingDirectory: string = process.cwd();
    public ownerUserId: number;
    public ownerGroupId: number;
    public standardInput: IStreamAdapter<Readable> | ProcessIOMode = ProcessIOMode.Pipe;
    public standardOutput: IStreamAdapter<Writable> | ProcessIOMode = ProcessIOMode.Pipe;
    public standardError: IStreamAdapter<Writable> | ProcessIOMode = ProcessIOMode.Pipe;

    
    public constructor(fileName: string, ...commandLineArguments: string[]) {
        Assert.argument('fileName', fileName).notNull();

        this.fileName = fileName;
        this.commandLineArguments = commandLineArguments;
    }
}
