import {FileSystemEntry} from './FileSystemEntry';
import {FileSystemWalkerContext} from './FileSystemWalkerContext';


export type FileDescriptor = number;

export type FileSystemEntrySelector = (entry: FileSystemEntry) => boolean;

export type FileSystemEntryProcessor = (
    entry: FileSystemEntry,
    context: FileSystemWalkerContext
) => Promise<boolean|void>;


