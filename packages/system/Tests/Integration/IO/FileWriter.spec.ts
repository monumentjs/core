import {FileWriter} from '../../..//file-system/FileWriter';
import {FileSystem} from '../../..//file-system/LocalFileSystem';
import {UnitFactory} from '@monument/core/Source/DI/unit/UnitFactory';
import {IUnitFactory} from '@monument/core/Source/DI/unit/Abstraction/IUnitFactory';
import {FileStorage} from '../../..//file-system/IFileStorage';


describe(`FileWriter`, () => {
    const unitFactory: IUnitFactory = new UnitFactory();
    const storage: FileStorage = unitFactory.getUnit(FileSystem);


    test(`creating of new file writer`, async () => {
        const textFileName: string = __dirname + '/Samples/TextFileOutput.txt';

        if (await storage.fileExists(textFileName)) {
            await storage.removeFile(textFileName);
        }

        await expect(storage.fileExists(textFileName)).resolves.toBe(false);

        const reader: FileWriter = new FileWriter(textFileName);

        assert.equals(reader.bytesWritten, 0);
        assert.equals(reader.path.toString(), textFileName);
        assert.true(reader.isWritable);
        assert.false(reader.isFinished);
        assert.false(reader.isClosed);
        assert.false(reader.isDisposed);

        await reader.close();

        await expect(storage.fileExists(textFileName)).resolves.toBe(true);

        if (await storage.fileExists(textFileName)) {
            await storage.removeFile(textFileName);
        }

        await expect(storage.fileExists(textFileName)).resolves.toBe(false);
    });
});
