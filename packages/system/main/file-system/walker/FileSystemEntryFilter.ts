import {FileSystemEntry} from '../FileSystemEntry';


export interface FileSystemEntryFilter {
    apply(entry: FileSystemEntry): Promise<boolean>;
}
