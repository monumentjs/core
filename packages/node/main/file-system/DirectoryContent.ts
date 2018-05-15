import {ReadOnlyList} from '@monument/collections/main/ReadOnlyList';
import {Directory} from './Directory';
import {File} from './File';


export class DirectoryContent {
    public readonly directories: ReadOnlyList<Directory>;
    public readonly files: ReadOnlyList<File>;


    public constructor(directories: ReadOnlyList<Directory>, files: ReadOnlyList<File>/*, links: ReadOnlyList<File>*/) {
        this.directories = directories;
        this.files = files;
    }
}
