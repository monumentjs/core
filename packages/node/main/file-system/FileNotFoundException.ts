import {Path} from '../path/Path';
import {IOException} from './IOException';


export class FileNotFoundException extends IOException {
    public constructor(path: Path) {
        super(`File "${path.toString()}" not found.`);
    }
}
