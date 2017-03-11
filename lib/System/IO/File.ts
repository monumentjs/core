import {AsyncResult} from '../../Core/types';
import Encoding from '../Text/Encoding';
import {IFileSystemStats, AccessPermissions} from './types';
import FileSystem from './FileSystem';


export default class File {

    /**
     *
     * @param path
     */
    public static async exists(path: string): AsyncResult<boolean> {
        let fileStats: IFileSystemStats;

        try {
            fileStats = await FileSystem.getStats(path);
        } catch (ex) {
            return false;
        }

        if (!fileStats.isFile) {
            throw new Error(`File system entry '${path}' exists but it's not a file.`);
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
        await FileSystem.createFile(fileName, accessPermissions);
    }

    /**
     *
     * @param path
     * @param text
     * @param encoding
     */
    public static async writeText(path: string, text: string, encoding: Encoding = Encoding.UTF8): AsyncResult<void> {
        if (encoding.encodingName === Encoding.BINARY.encodingName) {
            throw new Error(`Encoding '${encoding.encodingName} is not allowed.`);
        }

        await FileSystem.writeFile(path, encoding.getBytes(text));
    }

    /**
     *
     * @param path
     * @param encoding
     */
    public static async readText(path: string, encoding: Encoding = Encoding.UTF8): AsyncResult<string> {
        let buffer: Buffer;

        if (encoding.encodingName === Encoding.BINARY.encodingName) {
            throw new Error(`Encoding '${encoding.encodingName} is not allowed.`);
        }

        buffer = await FileSystem.readFile(path);

        return encoding.getString(buffer);
    }

    /**
     *
     * @param path
     * @param buffer
     */
    public static async writeBytes(path: string, buffer: Buffer): AsyncResult<void> {
        await FileSystem.writeFile(path, buffer);
    }

    /**
     *
     * @param path
     */
    public static async readBytes(path: string): AsyncResult<Buffer> {
        return FileSystem.readFile(path);
    }
}
