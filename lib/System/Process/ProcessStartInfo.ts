

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
    
    
    public constructor(fileName: string, commandLineArguments: string[] = []) {
        this.fileName = fileName;
        this.commandLineArguments = commandLineArguments;
    }
}
