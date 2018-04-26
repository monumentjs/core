import {Test} from '../../../../test-drive/decorator/TestConfiguration';
import {Case} from '../../../../test-drive/Decorators/Case';
import {AfterAll} from '@monument/test-drive/Decorators/AfterAll';
import {PassThroughChannel} from '../../../../stream-core/main/PassThroughChannel';
import {FileStorage} from '../../../file-system/FileStorage';
import {LocalFileSystem} from '../../../file-system/LocalFileSystem';
import {FileSystemEntry} from '../../../file-system/FileSystemEntry';
import {LocalFileInputStream} from '../../../file-system/LocalFileInputStream';
import {LocalFileOutputStream} from '../../../file-system/LocalFileOutputStream';
import {TextInputStream} from '../../../file-system/TextInputStream';
import {TextOutputStream} from '../../../file-system/TextOutputStream';


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


    @Test
    public async 'copy binary file with FileInputStream, FileOutputStream and PassThroughChannel'(assert: Assert) {
        let fileInputStream: LocalFileInputStream = new LocalFileInputStream(this.sourceBinaryFileName);
        let fileOutputStream: LocalFileOutputStream = new LocalFileOutputStream(this.targetBinaryFileName);
        let channel: PassThroughChannel<Buffer> = new PassThroughChannel(fileInputStream);

        channel.addOutput(fileOutputStream);

        await channel.resume();

        let sourceFile: FileSystemEntry = await this.fs.getEntry(this.sourceBinaryFileName);
        let targetFile: FileSystemEntry = await this.fs.getEntry(this.targetBinaryFileName);

        assert.true(fileInputStream.isEnded);
        assert.true(fileInputStream.isClosed);

        assert.false(fileOutputStream.isFinished);
        assert.false(fileOutputStream.isClosed);

        assert.equals(sourceFile.length, targetFile.length);

        await fileOutputStream.close();

        assert.true(fileInputStream.isEnded);
        assert.true(fileInputStream.isClosed);

        assert.true(fileOutputStream.isClosed);
        assert.true(fileOutputStream.isFinished);
    }


    @Test
    public async 'copy text file with TextInputStream, TextOutputStream and PassThroughChannel'(assert: Assert) {
        let fileInputStream: LocalFileInputStream = new LocalFileInputStream(this.sourceTextFileName);
        let fileOutputStream: LocalFileOutputStream = new LocalFileOutputStream(this.targetTextFileName);
        let textInputStream: TextInputStream = new TextInputStream(fileInputStream);
        let textOutputStream: TextOutputStream = new TextOutputStream(fileOutputStream);
        let channel: PassThroughChannel<string> = new PassThroughChannel(textInputStream);

        channel.addOutput(textOutputStream);

        await channel.resume();

        let sourceFile: FileSystemEntry = await this.fs.getEntry(this.sourceTextFileName);
        let targetFile: FileSystemEntry = await this.fs.getEntry(this.targetTextFileName);

        assert.true(fileInputStream.isEnded);
        assert.true(fileInputStream.isClosed);
        assert.true(textInputStream.isEnded);
        assert.true(textInputStream.isClosed);

        assert.false(fileOutputStream.isFinished);
        assert.false(fileOutputStream.isClosed);
        assert.false(textOutputStream.isClosed);

        assert.equals(sourceFile.length, targetFile.length);

        await fileOutputStream.close();

        assert.true(fileInputStream.isEnded);
        assert.true(fileInputStream.isClosed);
        assert.true(textInputStream.isEnded);
        assert.true(textInputStream.isClosed);

        assert.true(fileOutputStream.isClosed);
        assert.true(fileOutputStream.isFinished);
        assert.true(textOutputStream.isClosed);
    }


    @Test
    public async 'copy empty text file with TextInputStream, TextOutputStream and PassThroughChannel'(assert: Assert) {
        let fileInputStream: LocalFileInputStream = new LocalFileInputStream(this.sourceEmptyFileName);
        let fileOutputStream: LocalFileOutputStream = new LocalFileOutputStream(this.targetEmptyFileName);
        let textInputStream: TextInputStream = new TextInputStream(fileInputStream);
        let textOutputStream: TextOutputStream = new TextOutputStream(fileOutputStream);
        let channel: PassThroughChannel<string> = new PassThroughChannel(textInputStream);

        channel.addOutput(textOutputStream);

        await channel.resume();

        let sourceFile: FileSystemEntry = await this.fs.getEntry(this.sourceEmptyFileName);
        let targetFile: FileSystemEntry = await this.fs.getEntry(this.targetEmptyFileName);

        assert.true(fileInputStream.isEnded);
        assert.true(fileInputStream.isClosed);
        assert.true(textInputStream.isEnded);
        assert.true(textInputStream.isClosed);

        assert.false(fileOutputStream.isFinished);
        assert.false(fileOutputStream.isClosed);
        assert.false(textOutputStream.isClosed);

        assert.equals(sourceFile.length, targetFile.length);

        await fileOutputStream.close();

        assert.true(fileInputStream.isEnded);
        assert.true(fileInputStream.isClosed);
        assert.true(textInputStream.isEnded);
        assert.true(textInputStream.isClosed);

        assert.true(fileOutputStream.isClosed);
        assert.true(fileOutputStream.isFinished);
        assert.true(textOutputStream.isClosed);
    }
}
