import {FileSystemEntry} from '../FileSystemEntry';


export interface FileSystemEntryFilter {
    decide(entry: FileSystemEntry): Promise<boolean>;
}
