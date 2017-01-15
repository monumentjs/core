import { AsyncResult } from '../../Core/types';
import FileStats from './FileStats';
import Encoding from '../Text/Encoding';
export default class File {
    static getStats(path: string): AsyncResult<FileStats>;
    static exists(path: string): AsyncResult<boolean>;
    static create(path: string, overwrite?: boolean): AsyncResult<void>;
    static writeAllText(path: string, text: string, encoding?: Encoding, overwrite?: boolean): AsyncResult<void>;
    static readAllText(path: string, encoding?: Encoding): AsyncResult<string>;
    static writeAllBytes(path: string, buffer: Buffer, overwrite?: boolean): AsyncResult<void>;
    static readAllBytes(path: string): AsyncResult<Buffer>;
}
