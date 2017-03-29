import {AsyncResult} from '../../Core/types';
import Encoding from '../Text/Encoding';
import {AccessPermissions, IFileSystemStats} from './types';
import FileSystem from './FileSystem';
import Exception from '../../Core/Exceptions/Exception';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export default class File {

    /**
     *
     * @param fileName
     */
    public static async exists(fileName: string): AsyncResult<boolean> {
        assertArgumentNotNull('fileName', fileName);

        let fileStats: IFileSystemStats;

        try {
            fileStats = await FileSystem.getStats(fileName);
        } catch (ex) {
            return false;
        }

        if (!fileStats.isFile) {
            throw new Exception(`File system entry '${fileName}' exists but it's not a file.`);
        }

        return true;
    }

    /**
     *
     * @param fileName
     * @param accessPermissions
     */
    public static async create(
        fileName: string,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        await FileSystem.createFile(fileName, accessPermissions);
    }

    /**
     *
     * @param fileName
     * @param text
     * @param encoding
     */
    public static async writeText(
        fileName: string,
        text: string,
        encoding: Encoding = Encoding.UTF8
    ): AsyncResult<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('text', text);
        assertArgumentNotNull('encoding', encoding);

        await FileSystem.writeFile(fileName, encoding.getBytes(text));
    }

    /**
     *
     * @param fileName
     * @param encoding
     */
    public static async readText(
        fileName: string,
        encoding: Encoding = Encoding.UTF8
    ): AsyncResult<string> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('encoding', encoding);

        let buffer: Buffer = await FileSystem.readFile(fileName);

        return encoding.getString(buffer);
    }

    /**
     *
     * @param fileName
     * @param buffer
     */
    public static async writeBytes(
        fileName: string,
        buffer: Buffer
    ): AsyncResult<void> {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('buffer', buffer);

        await FileSystem.writeFile(fileName, buffer);
    }

    /**
     *
     * @param fileName
     */
    public static async readBytes(fileName: string): AsyncResult<Buffer> {
        assertArgumentNotNull('fileName', fileName);

        return FileSystem.readFile(fileName);
    }
}
