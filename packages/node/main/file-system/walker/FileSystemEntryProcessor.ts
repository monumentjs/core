import {File} from '../File';
import {Link} from '../Link';
import {Directory} from '../Directory';


export interface FileSystemEntryProcessor {
    onFile?(file: File): Promise<void> | void;
    onLink?(link: Link): Promise<void> | void;
    onDirectory?(directory: Directory): Promise<void> | void;
}

