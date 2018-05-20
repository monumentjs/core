import {ReadOnlyList} from '@monument/collections/main/ReadOnlyList';
import {Directory} from './Directory';
import {File} from './File';
import {Link} from './Link';


export class DirectoryContent {
    public readonly directories: ReadOnlyList<Directory>;
    public readonly files: ReadOnlyList<File>;
    public readonly links: ReadOnlyList<Link>;


    public constructor(directories: ReadOnlyList<Directory>, files: ReadOnlyList<File>, links: ReadOnlyList<Link>) {
        this.directories = directories;
        this.files = files;
        this.links = links;
    }
}
