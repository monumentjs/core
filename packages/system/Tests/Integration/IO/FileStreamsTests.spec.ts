import {Test} from '../../../../test-drive/decorator/TestConfiguration';
import {Case} from '../../../../test-drive/Decorators/Case';
import {AfterAll} from '@monument/test-drive/Decorators/AfterAll';
import {PassThroughChannel} from '../../../../stream-core/main/PassThroughChannel';
import {FileStorage} from '../../../FileSystem/FileStorage';
import {LocalFileSystem} from '../../../FileSystem/LocalFileSystem';
import {FileSystemEntry} from '../../../FileSystem/FileSystemEntry';
import {LocalFileInputStream} from '../../../FileSystem/LocalFileInputStream';
import {LocalFileOutputStream} from '../../../FileSystem/LocalFileOutputStream';
import {TextInputStream} from '../../../FileSystem/TextInputStream';
import {TextOutputStream} from '../../../FileSystem/TextOutputStream';


@Test()
export class FileStreamsTests {
    protected fs: FileStorage = LocalFileSystem.instance;
    protected sourceBinaryFileName = __dirname + '/Samples/Image.jpg';
    protected targetBinaryFileName = __dirname + '/Samples/Image.copy.jpg';
    protected sourceTextFileName = __dirname + '/Samples/TextFile.txt';
    protected targetTextFileName = __dirname + '/Samples/TextFile.copy.txt';
    protected sourceEmptyFileName = __dirname + '/Samples/EmptyFile';
    protected targetEmptyFileName = __dirname + '/Samples/EmptyFile.copy';


    @AfterAll()
    public async cleanUp() {
        await this.fs.removeFile(this.targetBinaryFileName);
        await this.fs.removeFile(this.targetTextFileName);
        await this.fs.removeFile(this.targetEmptyFileName);
    }


    @Case()
    public async 'copy binary file with FileInputStream, FileOutputStream and PassThroughChannel'() {
        let fileInputStream: LocalFileInputStream = new LocalFileInputStream(this.sourceBinaryFileName);
        let fileOutputStream: LocalFileOutputStream = new LocalFileOutputStream(this.targetBinaryFileName);
        let channel: PassThroughChannel<Buffer> = new PassThroughChannel(fileInputStream);

        channel.addOutput(fileOutputStream);

        await channel.resume();

        let sourceFile: FileSystemEntry = await this.fs.getEntry(this.sourceBinaryFileName);
        let targetFile: FileSystemEntry = await this.fs.getEntry(this.targetBinaryFileName);

        expect(fileInputStream.isEnded).toBe(true);
        expect(fileInputStream.isClosed).toBe(true);

        expect(fileOutputStream.isFinished).toBe(false);
        expect(fileOutputStream.isClosed).toBe(false);

        expect(sourceFile.length).toBe(targetFile.length);

        await fileOutputStream.close();

        expect(fileInputStream.isEnded).toBe(true);
        expect(fileInputStream.isClosed).toBe(true);

        expect(fileOutputStream.isClosed).toBe(true);
        expect(fileOutputStream.isFinished).toBe(true);
    }


    @Case()
    public async 'copy text file with TextInputStream, TextOutputStream and PassThroughChannel'() {
        let fileInputStream: LocalFileInputStream = new LocalFileInputStream(this.sourceTextFileName);
        let fileOutputStream: LocalFileOutputStream = new LocalFileOutputStream(this.targetTextFileName);
        let textInputStream: TextInputStream = new TextInputStream(fileInputStream);
        let textOutputStream: TextOutputStream = new TextOutputStream(fileOutputStream);
        let channel: PassThroughChannel<string> = new PassThroughChannel(textInputStream);

        channel.addOutput(textOutputStream);

        await channel.resume();

        let sourceFile: FileSystemEntry = await this.fs.getEntry(this.sourceTextFileName);
        let targetFile: FileSystemEntry = await this.fs.getEntry(this.targetTextFileName);

        expect(fileInputStream.isEnded).toBe(true);
        expect(fileInputStream.isClosed).toBe(true);
        expect(textInputStream.isEnded).toBe(true);
        expect(textInputStream.isClosed).toBe(true);

        expect(fileOutputStream.isFinished).toBe(false);
        expect(fileOutputStream.isClosed).toBe(false);
        expect(textOutputStream.isClosed).toBe(false);

        expect(sourceFile.length).toBe(targetFile.length);

        await fileOutputStream.close();

        expect(fileInputStream.isEnded).toBe(true);
        expect(fileInputStream.isClosed).toBe(true);
        expect(textInputStream.isEnded).toBe(true);
        expect(textInputStream.isClosed).toBe(true);

        expect(fileOutputStream.isClosed).toBe(true);
        expect(fileOutputStream.isFinished).toBe(true);
        expect(textOutputStream.isClosed).toBe(true);
    }


    @Case()
    public async 'copy empty text file with TextInputStream, TextOutputStream and PassThroughChannel'() {
        let fileInputStream: LocalFileInputStream = new LocalFileInputStream(this.sourceEmptyFileName);
        let fileOutputStream: LocalFileOutputStream = new LocalFileOutputStream(this.targetEmptyFileName);
        let textInputStream: TextInputStream = new TextInputStream(fileInputStream);
        let textOutputStream: TextOutputStream = new TextOutputStream(fileOutputStream);
        let channel: PassThroughChannel<string> = new PassThroughChannel(textInputStream);

        channel.addOutput(textOutputStream);

        await channel.resume();

        let sourceFile: FileSystemEntry = await this.fs.getEntry(this.sourceEmptyFileName);
        let targetFile: FileSystemEntry = await this.fs.getEntry(this.targetEmptyFileName);

        expect(fileInputStream.isEnded).toBe(true);
        expect(fileInputStream.isClosed).toBe(true);
        expect(textInputStream.isEnded).toBe(true);
        expect(textInputStream.isClosed).toBe(true);

        expect(fileOutputStream.isFinished).toBe(false);
        expect(fileOutputStream.isClosed).toBe(false);
        expect(textOutputStream.isClosed).toBe(false);

        expect(sourceFile.length).toBe(targetFile.length);

        await fileOutputStream.close();

        expect(fileInputStream.isEnded).toBe(true);
        expect(fileInputStream.isClosed).toBe(true);
        expect(textInputStream.isEnded).toBe(true);
        expect(textInputStream.isClosed).toBe(true);

        expect(fileOutputStream.isClosed).toBe(true);
        expect(fileOutputStream.isFinished).toBe(true);
        expect(textOutputStream.isClosed).toBe(true);
    }
}
