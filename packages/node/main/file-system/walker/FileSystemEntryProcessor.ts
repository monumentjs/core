import {FileSystemEntry} from '../FileSystemEntry';


export type FileSystemEntryProcessor = (entry: FileSystemEntry) => Promise<void> | void;

